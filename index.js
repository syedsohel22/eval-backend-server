const express = require("express");
require("dotenv").config();
const app = express();
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.json({ msg: "insta masai app" });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running on port ${process.env.port}`);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
});
