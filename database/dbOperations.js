// const cookieParser = require("cookie-parser");
const fs = require("fs");
const express = require("express");
const routers = express.Router();
// import {database, writeToDatabase} from "./dbConnect.js";
const dbOp = require("./dbConnect.js");
const dbQuery = require("./dbQuery.js");
async function writeToDatabase(type, object) {
  if (type == undefined || object == undefined || object == null) {
    console.error("要指定寫入資料庫的種類!");
    return;
  }
  // for(let key of Object.keys(object)){
  //   console.log("Key: ", key, "Data: ", object[key]);
  // }
  // return;
  let collection, key;
  switch (type) {
    case "user":
      collection = "user";
      key = object.name;
      // path += object[]
      break;
    case "merchantdise":
      collection = "merchantdise"; //Temporatory
      key = object.itemserial;
      break;
    case "order":
      collection = "order"; //Temporatory
      key = object.orderid;
      break;
  }
  const startTime = new Date();
  try {
    console.log("writeToDataBase");
    const dbref = database.ref(collection);
    const finaldb = dbref.child(key);
    // await database.ref(path).set(object);
    await finaldb.set(object);
    console.log("Data successfully written to the database.");

    // database.goOffline();
    const endTime = new Date();
    console.log("Time interval:", endTime - startTime);
    // process.exit(0);  // 正常退出
  } catch (error) {
    console.error("Error writing data:", error);
    // process.exit(1);  // 非正常退出
  }
}
async function removeItemfromDB(type, object) {
  if (type == undefined || object == undefined || object == null) {
    console.error("要指定從哪個資料庫刪除資料!");
    return;
  }
  let collection, key;
  switch (type) {
    case "user":
      collection = "user";
      key = object.name;
      // path += object[]
      break;
    case "merchantdise":
      collection = "merchantdise"; //Temporatory
      key = object.itemserial;
      break;
    case "order":
      collection = "order"; //Temporatory
      key = object.orderid;
      break;
  }
  const startTime = new Date();
  try {
    console.log("writeToDataBase");
    const dbref = database.ref(collection);
    const finaldb = dbref.child(key);
    // await database.ref(path).set(object);
    await finaldb.remove();
    console.log("Data successfully removed from database.");

    // database.goOffline();
    const endTime = new Date();
    console.log("Time interval:", endTime - startTime);
    // process.exit(0);  // 正常退出
  } catch (error) {
    console.error("Error writing data:", error);
    // process.exit(1);  // 非正常退出
  }
}
function getStatus(dbName, result) {
  let text = "dbName: " + dbName;
  // console.log("dbName:", dbName);
  result == true ? (text += " 存在") : (text += " 不存在");
  console.log(text);
}

/*async function querycollectionExist(name, callbackfunc) {

    try {
      const ref = database.ref(name);
      const snapshot = await ref.once('value');
      if (snapshot.exists()) {
        // console.log("DB :", name, "exists");
        callbackfunc(name, true);
        // database.goOffline();
        return true;
      }
      else {
        // console.log("DB: ", name, "doesn't exist");
        callbackfunc(name, false);
        return false;
      }
    } catch (error) {
      console.log("DB: ", name, "error!");
      return false;
    }
  }*/
module.exports = { writeToDatabase /*, querycollectionExist*/ };
/**
 * 其實這段的routers只是拿來測試用的，這邊不應該有用到
 * */
/*const data = {
    value: 123,
    value2: 345,
}

routers.get("/", (req, res)=>{
    res.write("OK!"); 
    // dbConnect.writeToDatabase(data);
    // dbOp.writeToDatabase(data);

    console.log("db get");
});

routers.post("/", (req, res)=>{
    console.log("db post");
});

module.exports = routers;*/
