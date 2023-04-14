import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { jwt: app.get("jwt") });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { jwt: app.get("jwt") });
});

app.post("/login", (req, res) => {
  axios
    .post(
      "https://idserver.lostgit.xyz/connect/token",
      {
        grant_type: "password",
        client_id: "tenant1",
        username: req.body.username,
        password: req.body.password,
        client_secret: "dev",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      app.set("jwt", response.data.access_token);
      res.render("login.ejs", { jwt: app.get("jwt") });
    })
    .catch((error) => {
      res.render("error.ejs", { errorMsg: "Invalid Username/Password" });
    });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", { sub: null });
});

app.post("/signup", (req, res) => {
  axios
    .post(
      "https://idserver.lostgit.xyz/user/create",
      {
        password: req.body.password,
        username: req.body.username,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + app.get("jwt"),
        },
      }
    )
    .then((response) => {
      res.render("signup.ejs", { sub: 1 });
    })
    .catch((error) => {
      res.render("error.ejs", { errorMsg: error.message });
    });
});

app.get("/logout", (req, res) => {
  app.set("jwt", null);
  res.render("index.ejs", { jwt: app.get("jwt") });
});

// Repository list service:
// app.get('/repositories', async (req, res) => {
//     try {
//       const response = await axios.get('https://repo.lostgit.xyz/repositories', {
//         headers: {
//             Authorization: 'Bearer ' + app.get('jwt')
//         }
//       });
//     //   res.send(response.data.repositories);
//       res.render("repositories.ejs", { response: response.data.repositories });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

// Repository list service with pagination:

// app.get("/repositories", async (req, res) => {
//   try {
//     const skip = parseInt(req.query.skip) || 0;
//     const limit = parseInt(req.query.limit) || 10;

//     const response = await axios.get("https://repo.lostgit.xyz/repositories", {
//       headers: {
//         Authorization: "Bearer " + app.get("jwt"),
//       },
//       params: {
//         skip,
//         limit,
//       },
//     });

//     const { repositories, totalMatches } = response.data;

//     res.render("repositories.ejs", {
//       repositories,
//       totalMatches,
//       currentPage: skip / limit + 1,
//       totalPages: Math.ceil(totalMatches / limit),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/repositories", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const filter = req.query.filter || "";

    const response = await axios.get("https://repo.lostgit.xyz/repositories", {
      headers: {
        Authorization: "Bearer " + app.get("jwt"),
      },
      params: {
        skip,
        limit,
        filter,
      },
    });

    const { repositories, totalMatches } = response.data;

    res.render("repositories.ejs", {
      repositories,
      totalMatches,
      currentPage: skip / limit + 1,
      totalPages: Math.ceil(totalMatches / limit),
      filter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/repositories/:id", async (req, res) => {
  try {
    const repositoryId = req.params.id;
    const response = await axios.get(`https://repo.lostgit.xyz/repositories/${repositoryId}`, {
      headers: {
        Authorization: "Bearer " + app.get("jwt"),
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
