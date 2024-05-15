const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/momo-dukan");

app.get("/", (req, res) => {
  res.send(
    `Welcome to the server! Here's the request body: ${JSON.stringify(
      req.body
    )}`
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    }
  });
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the user" });
    });
});

const port = 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
