const cookieParser = require("cookie-parser");
const fs = require("fs");
const express = require("express");
const routers = express.Router();

const { verifyOK, verifyFail, dbQuery } = require("../database/dbQuery");
const mongoQuery = require("../database/mongodbOperation");

routers.get("/", (req, res) => {
  console.log(req);
  console.log("req.baseUrl:", req.baseUrl, ";req.method: ", req.method);
  console.log(
    "query user:",
    req.query.user,
    " query password:",
    req.query.password
  );
  fs.readFile("./template/login.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

routers.post("/", (req, res) => {
  console.log("login post request", req.body);
  console.log(
    "username: ",
    req.body.username,
    " password: ",
    req.body.password,
    "phone: ",
    req.body.phone,
    "session name?",
    req.session.username,
    "session phone?",
    req.session.phone
  );
  mongoQuery
    .checkLogin(req.body.username, req.body.phone, req.body.password)
    .then(([result, name, admin]) => {
      console.log("result: ", result);
      req.session.username = name || req.body.phone || req.body.username;
      console.log("req.session.username: ", req.session.username);
      if (result === true) {
        console.log("登入成功");
        let isAdmin = admin === true ? "admin" : "user";
        console.log("isAdmin: ", isAdmin);
        res.json({
          success: true,
          username: req.session.username,
          status: 0,
          admin: isAdmin,
        });
      } else if (result === false) {
        console.log("密碼錯誤，登入失敗");
        res.json({
          success: false,
          username: req.session.username,
          status: -1,
        });
      } else if (result === -2) {
        console.log("沒有帳號或密碼");
        res.json({ success: false, status: -3 }); //不應該存在，前端要擋掉沒有輸入的狀況
      } else {
        console.log("名稱不存在，導向註冊");
        res.json({ success: false, status: -2 });
      }
    })
    .catch((err) => console.log("checklogin Error: ", err));
});

function checkdbstatus(value) {
  console.log("value is : ", value);
  return value;
  if (value == false) {
  } else {
  }
}
module.exports = routers;
