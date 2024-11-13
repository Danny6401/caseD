const e = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
const mongoDBOperation = require("../database/mongodbOperation");
const routers = express.Router();
app.set("view engine", "ejs");

routers.get("/:username/:orderid", async (req, res) => {
  console.log("2 levels");
  console.log("req.session.username: ", req.session.username);
  console.log("req.params.username: ", req.params.username);
  console.log("req.params.orderid: ", req.params.orderid);
  try {
    const userorder = await mongoDBOperation.queryrecordfromcollection(
      "orders",
      { username: req.params.username }
    );

    console.log("get data: ", userorder);
    if (userorder !== null) {
      const result = findOrderById(userorder.orderlist, req.params.orderid);
      // if (result !== null) res.send(JSON.stringify(result));
      if (result !== null) res.send(result);
      else res.status(404).send("Not FOund!");
      // result === null
      //   ? res.status(404).send("Record not found")
      //   : res.send(JSON.stringify(result));
    } else res.status(404).send("Not found");
  } catch (err) {
    console.log("Error: ", err);
  }
});

routers.get("/:username", async (req, res) => {
  console.log("1 level");
  console.log("req.session.username: ", req.session.username);
  console.log("req.params.username: ", req.params.username);
  if (
    req.session.username == undefined ||
    req.params.username !== req.session.username
  ) {
    res.redirect("/");
    res.end();
  } else {
    const data = await mongoDBOperation.queryrecordfromcollection("users", {
      username: req.session.username,
    });
    delete data.password;
    delete data.admin;
    delete data._id;
    let TempOrder = [];
    for (let item of data.order) TempOrder.push(item);
    console.log("TempOrder:", TempOrder);
    const respmsg = JSON.stringify(data);
    res.send(respmsg);
    res.end();
  }
});

function findOrderById(data, targetOrderId) {
  let object = {};
  let match = 0;
  // console.log(data.length())
  console.log(data.length);
  for (const item of data) {
    console.log("Item: ", item);
    for (const list of item) {
      object = list;
      console.log("object: ", object);
      if (object.orderid === targetOrderId) {
        console.log("Match!");
        match = 1;
        break;
      }
    }
    if (match === 1) {
      return item;
    }
  }
  return null;
}

routers.post("/", (req, res) => {});

module.exports = routers;
