import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

// Base route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});