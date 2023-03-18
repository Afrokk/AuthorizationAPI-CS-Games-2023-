import express from "express";
import path from "path";
import { fileURLToPath } from "url"; 
import axios from "axios";
import { stringify } from "querystring";

const app = express();
const __filename = fileURLToPath(import.meta.url);      
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs",);
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post('/login', (req, res) => {
    axios.post('https://idserver.lostgit.xyz/connect/token', { 
        username: req.body.username,
        password: req.body.password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }})
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
        res.send(error);
    });
});

app.listen(8000, () => {
    console.log('Server running on port 3000');
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
  });
