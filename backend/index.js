const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("../backend/connnection");
const User = require("../models/User");

const app = express();
const cors = require("cors");

const publicPath = path.join(__dirname, "..", "/public");
console.log(__dirname);

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/", (req, res) => {
  User.find({})
    .sort({ score: "desc" })
    .limit(5)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

app.post("/add", (req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  const newUser = new User({ username, score });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, () => {
  console.log(`Connected to ${port}`);
});
