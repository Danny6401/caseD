const express = require("express");
const routers = express.Router();
const mongoDb = require("../database/mongodbOperation");

routers.get("/:name", (req, res) => {
  let string = `Merchantdise ${req.params.name}`;
  res.send(string);
});

routers.get("/", (req, res) => {
  mongoDb
    .queryallfromcollection("merchantdise")
    .then((result) => {
      console.log("result0:", result);
      let string = JSON.stringify(result);
      console.log(string);
      res.send(result);
    })
    .catch((err) => console.log("Err:", err));
});

module.exports = routers;
