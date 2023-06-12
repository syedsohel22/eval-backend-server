const express = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
require("dotenv").config();
//Registration

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age, city, gender, is_married } = req.body;
  try {
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      res.json({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.json({ err: err });
        } else {
          const user = new userModel({
            name,
            email,
            password: hash,
            age,
            city,
            gender,
            is_married,
          });
          await user.save();
          res.json({ msg: "user has been Registred.!", user: req.body });
        }
      });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

//Login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.secretKey
          );
          res.json({ msg: "Login SuccessFully..!", token });
        } else {
          res.json({ error: "wrong email or password" });
        }
      });
    } else {
      res.json({ msg: "user does not exits..!" });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = userRouter;
