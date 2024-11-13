const Express = require("express");
const dbappend = require("../database/mongodbOperation");
const Router = Express.Router();
Router.get("/", (req, res) => {
  res.send("Doesn't make sense");
});

Router.post("/", (req, res) => {
  let ResponseMsg = {};
  if (req.session.username !== undefined)
    console.log("username?", req.session.username);
  else {
    console.log("req.session.username is undefined!");
    ResponseMsg.status = 302;
    ResponseMsg.responseMsg = "請先登入!";
    res.send(JSON.stringify(ResponseMsg));
    return;
  }
  const DTNow = new Date();
  let dispDT =
    DTNow.getFullYear().toString() +
    (DTNow.getUTCMonth() + 1).toString().padStart(2, "0") +
    DTNow.getDate().toString().padStart(2, "0") +
    DTNow.getHours().toString().padStart(2, "0") +
    DTNow.getMinutes().toString().padStart(2, "0") +
    DTNow.getSeconds().toString().padStart(2, "0") +
    DTNow.getMilliseconds().toString();
  // console.log("Month and Day:", DTNow.getUTCMonth().toString(), " ", DTNow.getDate().toString());
  console.log("currentTime:", dispDT, " ; req.body:", req.body);
  let Items = [];
  let OrderID = { orderid: dispDT };
  Items.push(OrderID);

  for (let item of req.body) Items.push(item);

  console.log("Items: ", Items);
  dbappend.appendOrdertoUser("users", req.session.username, dispDT);
  dbappend.appendDatatoExistRecord("orders", req.session.username, Items);
  ResponseMsg.responseMsg = "交易成功";
  ResponseMsg.status = 200;
  ResponseMsg.orderid = dispDT;
  res.send(JSON.stringify(ResponseMsg));
});

module.exports = Router;
