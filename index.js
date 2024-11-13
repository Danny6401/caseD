const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const MongoStore = require('connect-mongo')(session);  //V7不能用這種方式
const MongoStore = require("connect-mongo");
const path = require("path");
const dbHandle = require("./database/mongodbOperation.js");
require("dotenv").config();

const {
  initialUsers,
  initialmerchantdisedata,
  initialorderdata,
} = require("./database/mongodbInitial.js");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));

app.use(express.static(path.join(__dirname, "public")));

//V7也是要這種方式創造
/*const store = MongoStore.create({
  mongoUrl : "mongodb://localhost:27017/sessiondb",
  collectionName: "sessions",
});*/
//const URL = "mongodb://iad2-c18-1.mongo.objectrocket.com:52279?ssl=true";
let URL = "";
if (process.env.ENVIRONMENT === "TEST")
  URL = "mongodb://localhost:27017/sessiondb";
else
  URL =
    "mongodb://ajaxliu:0927972235@iad2-c18-1.mongo.objectrocket.com:52279,iad2-c18-0.mongo.objectrocket.com:52279,iad2-c18-2.mongo.objectrocket.com:52279/caseDesign?replicaSet=9cb1e8e9c4564222965a058a8041a23d";
app.use(
  session({
    secret: "20241003Thur", // 用來簽署 session id 的 key
    resave: true, // 不重新儲存  session，如果 session 沒有被修改
    saveUninitialized: true, // 儲存未初始化的 session
    store: MongoStore.create({
      //mongoUrl: "mongodb://localhost:27017/sessiondb",
      mongoUrl: URL,
      collectionName: "sessions",
    }),
    //store:new MongoStore({url:"mongodb://localhost:27017/sessiondb"}), //ReferenceError: Cannot access 'MongoStore' before initialization
    cookie: { maxAge: 600 * 1000 },
  })
);

/*app.get("/", (req, res) => {
  fs.readFile("./template/index.html", (err, data) => res.send(data));
});*/
/*
  app.get("/", (req, res)=>{res.sendFile(__dirname+'/template/index.html');});

  __dirname=>這個檔案的絕對路徑
*/
/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});*/

const homerouter = require("./routers/home.js"); //如果不是要改變內容，應該用上面那一段就好
app.use("/", homerouter);

const loginrouter = require("./routers/login.js");
app.use("/login", loginrouter);

//Test operation only
/*const databaserouter = require("./database/dbOperations.js");
app.use("/testdb", databaserouter);*/

const registerroute = require("./routers/register.js");
app.use("/signup", registerroute);

const caseItems = require("./routers/caseitems.js");
app.use("/caseItems", caseItems);

const account = require("./routers/account.js");
app.use("/account", account);

const merchantdise = require("./routers/merchantdise.js");
app.use("/merchantdise", merchantdise);

const system = require("./routers/system.js");
app.use("/system", system);

const receiveOrder = require("./routers/receiveOrder.js");
const { Collection } = require("mongodb");
app.use("/uploadorder", receiveOrder);

const logout = require("./routers/logout.js");
app.use("/logout", logout);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

initialUsers();
initialmerchantdisedata();
initialorderdata();
const port = process.env.PORT || 443;
app.listen(port, () => {
  const DT = new Date();
  let Displaystring =
    DT.getHours().toString().padStart(2, "0") +
    ":" +
    DT.getMinutes().toString().padStart(2, "0") +
    ":" +
    DT.getSeconds().toString().padStart(2, "0");
  console.log("Server Starts at: ", Displaystring, "with Port: ", port);
});
