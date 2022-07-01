const path = require("path");
const connectDB = require("../backend/connnection");
const express = require("express");
const app = express();
const cors = require("cors");

//AUTOMATICALLY SERVERS INDEX PAGE for app.get("/")
const publicPath = path.join(__dirname, "..", "/build");
console.log(publicPath);

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

connectDB();

const usersRouter = require("../backend/routes/User");
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, () => {
  console.log(`Connected to ${port}`);
});
