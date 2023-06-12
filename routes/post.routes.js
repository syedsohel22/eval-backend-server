const express = require("express");
const postModel = require("../model/post.model");
const auth = require("../middelware/auth.middelware");
const postRouter = express.Router();
require("dotenv").config();

// authrorization

postRouter.use(auth);

//create

postRouter.post("/add", async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.json({ msg: "new post has been added.!", post: req.body });
  } catch (err) {
    res.json({ error: err });
  }
});
// read
postRouter.get("/", async (req, res) => {
  try {
    const posts = await postModel.find({ userID: req.body.userID });
    res.send(posts);
  } catch (err) {
    res.json({ error: err });
  }
});

// top
postRouter.get("/top", async (req, res) => {
  try {
  } catch (err) {
    res.json({ error: err });
  }
});

//update
postRouter.patch("/update/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await postModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    console.log(userIDinUserDoc, userIDinPostDoc);
    if (userIDinUserDoc === userIDinPostDoc) {
      await postModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.json({ msg: `${post.title} has been updated.` });
    } else {
      res.json({ msg: "not authorized." });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

// delete
postRouter.delete("/delete/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await postModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    console.log(userIDinUserDoc, userIDinPostDoc);
    if (userIDinUserDoc === userIDinPostDoc) {
      await postModel.findByIdAndDelete({ _id: postID });
      res.json({ msg: `${post.title} has been deleted.` });
    } else {
      res.json({ msg: "not authorized." });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = postRouter;
