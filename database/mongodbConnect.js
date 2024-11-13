const mongoClient = require("mongodb").MongoClient;
const {Defines, ConnectString} = require("../utils/defines");
//const URL = "iad2-c18-0.mongo.objectrocket.com:52279?ssl=true";
async function connecttoDB(dbType) {
  // const connectstring = "";
/*  if (Defines.useObjectRocket === true)
    connectstring =
      "mongodb://ajaxliu:0927972235@iad2-c18-1.mongo.objectrocket.com:52279,iad2-c18-0.mongo.objectrocket.com:52279,iad2-c18-2.mongo.objectrocket.com:52279/caseDesign?replicaSet=9cb1e8e9c4564222965a058a8041a23d";
  else
    connectstring = "mongodb://localhost:27017/caseDesign";*/
  try {
    //const client = new mongoClient("mongodb://localhost:27017/caseDesign");
    //const client = new mongoClient(URL);
    //資料庫要自己創造，對於該資料庫的使用者名稱以及密碼就是自己設定在該資料庫那邊(對於objectRocket而言)
    /*const username = "ajaxliu";
    const password = "0927972235";
    const database = "caseDesign";
    const options = "?replicaSet=9cb1e8e9c4564222965a058a8041a23d";
    let connectstring =
      "mongodb://" +
      username +
      ":" +
      password +
      "@" +
      URL +
      "/" +
      database +
      options;*/
    if (Defines.useObjectRocket) {
      console.log("ConnectString:", ConnectString);
      const result = await mongoClient.connect(ConnectString);
      return result;
    }
    else {
      const client = new mongoClient(ConnectString);
      await client.connect();
      return client;
    }
  } catch (error) {
    console.log("MongoDB connect failed!");
    console.log("Fail reason: ", error);
    return null;
  }
}
/*const connection = (async ()=>{
    await client.connect();
    const database = client.db("caseDesign");
    const user = database.collection("users");
    await user.insertOne(sampledata);
    await client.close();
    // await client.close();
    // console.log("Mongodb Closed!");
})().catch(err=>{console.log("ConnectErr: ", err); });*/

module.exports = connecttoDB;
