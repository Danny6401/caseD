const express = require("express");
const routers = express.Router();
routers.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("session destroy error: ", err);
    } else {
      console.log("session destroy success");
      res.redirect("/");
    }
  });
});

module.exports = routers;
