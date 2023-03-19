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
    res.render("index.ejs",);
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post('/login', (req, res) => {
    axios.post('https://idserver.lostgit.xyz/connect/token', { 
        username: req.body.username,
        password: req.body.password,
        grant_type: 'password',
        client_id: 'tenant1',
        client_secret: 'dev',
        // Bearer with service token, requires JWT signature on the other side
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlpocHhFQVlPVHFCVnhvTXpKWFRZc1ljRTItZz0iLCJ4NXQiOiJaaHB4RUFZT1RxQlZ4b016SlhUWXNZY0UyLWc9In0.eyJjbGllbnRfaWQiOiJ0ZW5hbnQxIiwiaXNzIjoiaHR0cHM6Ly9pZHNlcnZlci5sb3N0Z2l0Lnh5eiIsImF1ZCI6WyJodHRwczovL2lkc2VydmVyLmxvc3RnaXQueHl6IiwicmVwb2FwaSIsImlkc2VydmVyIiwic25pcHBldHNhcGkiXSwic2NvcGUiOlsicmVwb2FwaSIsImlkc2VydmVyIiwic25pcHBldHNhcGkiXSwibmJmIjoxNjc5MTYyNTQxLCJleHAiOjE2NzkxNjYxNDEsImlzX3NlcnZpY2UiOiJ0cnVlIiwicm9sZSI6InNlcnZpY2UifQ.bVMQghaDVXAwr1eRo-Q_fzri7NWyR_q6u0_tZ0P1_Y-r3rdqeWE7lR_Z87HUgbEkRGVTx5WgLS6WLSKNhzGSzPNzOZ2XDme2Xav3ties6maTUFrLAgpllg-KvjgBdBYlXGFCBu0aup0MsDaPwKQF7AzZvfNqbbOkXs9ATTzlc0SP5z85EKZkP-EjdgIDPcZsveITMCcSqa1C_JnizF7WnGjmB7M5d4h6dnKlZObluGyzNcLlThe4cjrJAVgRYlVrpr0g1N8t88k0y4IjJEh-cufDPCCJ8PdV255aCQNg8tDMkP3l8aLN_Fw8F3RxwfOTKfqtQZYZiVEkG5kJu2n9cA"
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }})
    .then((response) => {
        let jwt = response.data.access_token;
    })
    .catch((error) => {
        res.render("error.ejs");
    });
});


app.get("/signup", (req, res) => {
    res.render("signup.ejs");
  });

app.post('/signup', (req, res) => {
    axios.post('https://idserver.lostgit.xyz/user/create', { 
        client_id: 'tenant1',
        client_secret: 'dev',
        grant_type: 'client_credentials',
        username: req.body.username,
        password: req.body.password,
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlpocHhFQVlPVHFCVnhvTXpKWFRZc1ljRTItZz0iLCJ4NXQiOiJaaHB4RUFZT1RxQlZ4b016SlhUWXNZY0UyLWc9In0.eyJjbGllbnRfaWQiOiJ0ZW5hbnQxIiwiaXNzIjoiaHR0cHM6Ly9pZHNlcnZlci5sb3N0Z2l0Lnh5eiIsImF1ZCI6WyJodHRwczovL2lkc2VydmVyLmxvc3RnaXQueHl6IiwicmVwb2FwaSIsImlkc2VydmVyIiwic25pcHBldHNhcGkiXSwic2NvcGUiOlsicmVwb2FwaSIsImlkc2VydmVyIiwic25pcHBldHNhcGkiXSwibmJmIjoxNjc5MTYyNTQxLCJleHAiOjE2NzkxNjYxNDEsImlzX3NlcnZpY2UiOiJ0cnVlIiwicm9sZSI6InNlcnZpY2UifQ.bVMQghaDVXAwr1eRo-Q_fzri7NWyR_q6u0_tZ0P1_Y-r3rdqeWE7lR_Z87HUgbEkRGVTx5WgLS6WLSKNhzGSzPNzOZ2XDme2Xav3ties6maTUFrLAgpllg-KvjgBdBYlXGFCBu0aup0MsDaPwKQF7AzZvfNqbbOkXs9ATTzlc0SP5z85EKZkP-EjdgIDPcZsveITMCcSqa1C_JnizF7WnGjmB7M5d4h6dnKlZObluGyzNcLlThe4cjrJAVgRYlVrpr0g1N8t88k0y4IjJEh-cufDPCCJ8PdV255aCQNg8tDMkP3l8aLN_Fw8F3RxwfOTKfqtQZYZiVEkG5kJu2n9cA"
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }})
    .then((response) => {
        res.send(response.data)
    })
    .catch((error) => {
        res.render("error.ejs");
    });
});

app.listen(3100, () => {
    console.log('Server running on port 3000');
});
