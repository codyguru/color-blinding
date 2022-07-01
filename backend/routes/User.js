const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.route("/").get((req, res) => {
  User.find({})
    .sort({ score: -1 })
    .limit(5)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const score = req.body.score;

  const newUser = new User({ username, score });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

// router.post('/', async (req, res) => {
//     const { username, score } = req.body;
//     let user = {};
//     user.username = username;
//     user.score = score;

//     let userModel = new User(user);
//     await userModel.save();
//     res.json(userModel);
// });

module.exports = router;
