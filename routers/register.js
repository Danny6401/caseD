const cookieParser = require("cookie-parser");
const fs = require("fs");
const express = require("express");
const routers = express.Router();
// const db = require("../database/dbConnect");
// const {dbQuery, dbQueryUser} = require("../database/dbQuery");
// const { dbQuery } = require("../database/dbQuery");
// const { writeToDatabase } = require("../database/dbOperations");
const dbHandle = require("../database/mongodbOperation");

/*routers.get("/", (req, res) => {
  fs.readFile("./template/register.html", (error, data) => {
    res.write(data);
    res.end();
  });
});*/

routers.post("/", async (req, res) => {
  const {
    username,
    nickname,
    phoneNumber,
    email,
    password,
    address,
    birthday,
  } = req.body;
  const registerData = {
    username: username,
    nickname: nickname,
    phonenumber: phoneNumber,
    email: email,
    password: password,
    address: address,
    birthday: birthday,
    order: [],
  };
  console.log(
    "name: ",
    username,
    "nickname: ",
    nickname,
    "phoneNumber: ",
    phoneNumber,
    " email: ",
    email,
    " password: ",
    password,
    " address: ",
    address,
    " birthday: ",
    birthday
  );
  let key = { phonenumber: phoneNumber };
  console.log("Key0: ", key);
  try {
    let result = await dbHandle.queryrecordfromcollection("users", key);
    console.log("result0: ", result);
    if (result) {
      res.status(202).json({ message: "該電話號碼已存在!", result: false });
      return;
    }
    key = { email: email };
    result = await dbHandle.queryrecordfromcollection("users", key);
    console.log("result1: ", result);
    if (result) {
      res.status(202).json({ message: "該電子郵件信箱已存在!", result: false });
      return;
    }
    result = await dbHandle.insertdatatoCollection("users", registerData);
    console.log("insert Result:", result);
    if (result.insertedId !== undefined && result.insertedId !== null)
      res.status(200).json({ message: "帳號建立成功!!", result: true });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server Error", result: false });
  }
  // key = {email: email};
  // console.log("Key1: ", key);
  // dbHandle.queryrecordfromcollection("users", key).then(result=>console.log("result: ", result));

  /*dbQuery.dbQueryUser(name, password, (result) => {
    if (result == false)
      writeToDatabase("user", {
        name: name,
        email: email,
        password: password,
        address: address,
        birthday: birthday,
      });
    //使用者不存在，寫入DB
    else {
      fs.readFile("./template/useralreadyexists.html", (err, data) => {
        res.write(data);
        res.end();
      });
    }
  });
  fs.readFile("./template/welcome.html", (error, data) => {
    res.write(data);
    res.end();
  });*/
});

module.exports = routers;
