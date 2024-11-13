const { query } = require("express");
const Handle = require("./mongodbConnect");
// const { use } = require("../routers/account");
const RespCode = require("../utils/ResponseCode");
const Defines = require("../utils/defines");
const mongoDBOperation = {
  /**
   *
   * @param {*} collectionName
   * @param {*} key
   * @param {*} data
   * replace/update date,像是訂單已運送等等...
   */
  replaceData: async (collectionName, key, data) => {
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      return await collection.updateOne(key, { $set: data });

      // await handle.close();
    } catch (err) {
      console.log("update DB Error!");
      console.log(err);
      return RespCode.failure;
    }
  },

  /**.b.body.phone,body.phone,dy.phone,
   *
   * @param {*} collection
   * @param {*} key
   * @param {*} data
   * data 要是目標資料，像是order的話就是{order:123}
   */
  // async function appendDatatoExistRecord(collectionName, key, data){
  //沒有的話就新增
  //沒有的話就新增
  appendDatatoExistRecord: async (collectionName, key, data) => {
    console.log("appendDatatoExistRecord");
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const queryKey = { username: key };

      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      console.log("Key: ", key);
      console.log("Data: ", data, " and typeof data: ", typeof data);
      const user = await collection.findOne(queryKey);
      if (user !== null) {
        console.log("User exists!");
        await collection.updateOne(queryKey, { $push: { orderlist: data } });
      } else {
        console.log("User doesn't exist!"); //ToDo:第一筆資料/首購 沒辦法寫到資料庫?
        await collection.insertOne(queryKey, { $push: { orderlist: data } });
        await collection.updateOne(queryKey, { $push: { orderlist: data } });
      }
      return RespCode.success;
    } catch (err) {
      console.log("appendDatatoExistRecord DB Error!");
      console.log(err);
      return RespCode.failure;
    }
  },

  appendOrdertoUser: async (collectionName, key1, data) => {
    console.log("appendOrdertoUser");
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      console.log(`Searching for user: ${key1}`);
      await collection.updateOne(
        { username: key1 },
        { $push: { order: data } }
      );
    } catch (err) {
      console.log("appendOrdertoUser Error!");
      console.log(err);
    }
  },
  // async function insertdatatoCollection(collectionName, data){
  insertdatatoCollection: async (collectionName, data) => {
    console.log("insertdatatoCollection");
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      const result = await collection.insertOne(data);
      return result;
      // await handle.close();
    } catch (err) {
      console.log("insertdatatoCollection error!");
      console.log(err);
    }
  },

  /**
   *
   * @param {*} collectionName - string
   * @param {*} key - object with key-value pair
   */
  deleterecordfromcollection: async (collectionName, key) => {
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      return await collection.deleteOne(key);
    } catch (err) {
      console.log("deleterecordfromcollection error!");
      console.log(err);
      return;
    }
  },

  // async function queryrecordfromcollection(collectionName, key){
  queryrecordfromcollection: async (collectionName, key) => {
    console.log("queryrecordfromcollectuin key: ", key);
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      const data = await collection.findOne(key);
      // await handle.close();
      return data;
    } catch (err) {
      console.log("queryrecordfromCollection error!");
      console.log(err);
    }
  },

  queryallfromcollection: async (collectionName, key) => {
    let handle = null;
    try {
      handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      } else console.log("DB Handle Get");

      const database = handle.db("caseDesign");
      const collection = database.collection(`${collectionName}`);
      const data = await collection.find().toArray();
      console.log("Data: ", data);
      // await handle.close();
      return data;
    } catch (err) {
      console.log("queryallCollection error!");
      console.log(err);
    } finally {
      if (handle) await handle.close();
    }
  },

  checkLogin: async (email, phonenumber, password) => {
    let key = null;
    console.log(
      "email: ",
      email,
      "type email: ",
      typeof email,
      "phone: ",
      phonenumber,
      "type phone:",
      typeof phone
    );
    if (email === undefined || email.length === 0) {
      key = { phonenumber: `${phonenumber}` };
    } else key = { email: `${email}` };

    if (email === undefined && phonenumber === undefined) return -2;

    console.log("login key:", key);
    try {
      const handle = await Handle();
      if (handle === null) {
        throw new Error("DB Handle null!");
      }
      let result = [];
      const database = handle.db("caseDesign");
      const collection = database.collection("users");
      const data = await collection.findOne(key);
      await handle.close();
      console.log("userdata:", data);
      if (data === null) result.push(-1);
      // result = -1;
      else if (password === data.password) {
        result.push(true);
        result.push(data.username);
        result.push(data.admin);
      }
      // result = true;
      else {
        result.push(false);
        result.push(data.username);
      }
      console.log("result:", result);
      return result;
      // return data;
    } catch (err) {
      console.log("checkLogin error!");
      console.log(err);
    }
  },
};
/*const result = mongoDBOperation
  .queryrecordfromcollection("users", { _id: "Danny" })
  .then((data) => console.log(data));
mongoDBOperation.deleterecordfromcollection("users", {
  email: "Danny.I@gmail.com",
});*/
module.exports = mongoDBOperation;
