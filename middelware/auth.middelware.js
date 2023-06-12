const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secretKey);

      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.user = decoded.user;
        next();
      } else {
        res.json({ msg: "not authorized" });
      }
    } catch (err) {
      res.json({ err });
    }
  } else {
    res.json({ msg: "login again..!" });
  }
};

module.exports = auth;
