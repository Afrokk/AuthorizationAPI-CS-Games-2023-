import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import bodyParser from "body-parser";
import { request } from "http";

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
        .post("https://idserver.lostgit.xyz/connect/token", {
            grant_type: "password",
            client_id: "tenant1",
            username: req.body.username,
            password: req.body.password,
            client_secret: "dev",
        }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        })
        .then((response) => {
        app.set('jwt', response.data.access_token);
        res.render("login.ejs", { jwt: app.get('jwt') });
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
          "Authorization": "Bearer " + app.get('jwt')
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
    app.set('jwt', null);
    res.render("index.ejs", { jwt: app.get('jwt')});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
