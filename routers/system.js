const express = require("express");
const routers = express.Router();
const dbHandle = require("../database/mongodbOperation");
const RespCode = require("../utils/ResponseCode");
const DbOrders = "orders";
const DbItems = "merchantdise";
const DbUsers = "users";
const { ObjectId } = require("mongodb");
// const formidable = require("formidable");
const fileUpload = require("express-fileupload");
const fs = require("fs");
// const path = require("path");

routers.use(fileUpload());

routers.get("/", (req, res) => {
  console.log("System IN~");
  let data = { data: true };
  let string = JSON.stringify(data);
  res.send(data);
});

routers.post("/", (req, res) => {});
routers.get("/:path1/:path2/:path3", (req, res) => {
  let string =
    req.params.path1 + " and " + req.params.path2 + " and " + req.params.path3;
  res.send(string);
});
routers.get("/AdminItem", (req, res) => {
  dbHandle
    .queryallfromcollection("merchantdise")
    .then((result) => {
      console.log("result AdminItem: ", result);
      res.send(result);
    })
    .catch((err) => console.log(err));
});
routers.post("/AdminItem", async (req, res) => {
  console.log("POST AdminItem");
  console.log("req.body.action:", req.body.action);
  console.log("Req.body: ", req.body);
  if (req.body.action === "delete") {
    let result = null;
    let key;
    if (req.body._id.length > 5) {
      console.log("Length > 5");
      key = new ObjectId(req.body._id);
    } else key = req.body._id;
    result = await dbHandle.queryrecordfromcollection(DbItems, { _id: key });
    console.log("queryResult0: ", result);
    if (result === null) return res.status(400).send("查無該筆資料!");
    console.log("queryResult1: ", result);
    const { filename } = result;
    fs.unlink(__dirname + "/../public/photo/case/" + filename, (err) => {
      console.log("unlink err");
    });
    retulr = await dbHandle.deleterecordfromcollection(DbItems, { _id: key });
    console.log("delete Result", result);
    res.send({ message: "刪除成功" });
  }
});

routers.post("/AdminItem/UploadItem", async (req, res) => {
  console.log(
    "req.body.name: ",
    req.body.name,
    ";req.body.description: ",
    req.body.description
  );
  let price = parseInt(req.body.price);
  console.log("UploadItem request: ", req);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded");
  }
  console.log("req.files: ", req.files);
  let fileuploaded = req.files.picture;
  let uploadpath = __dirname + "/../public/photo/case/" + fileuploaded.name;

  // console.log("UploadPath: ", uploadpath);

  fileuploaded.mv(uploadpath, (err) => {
    if (err) {
      console.log("fileupload.mv:", err);
      return res.status(400).send("檔案上傳失敗!");
    }
    //res.send("檔案上傳成功!");
  });
  const DTNow = new Date();
  let dispDT =
    DTNow.getFullYear().toString() +
    (DTNow.getUTCMonth() + 1).toString().padStart(2, "0") +
    DTNow.getDate().toString().padStart(2, "0") +
    DTNow.getHours().toString().padStart(2, "0") +
    DTNow.getMinutes().toString().padStart(2, "0") +
    DTNow.getSeconds().toString().padStart(2, "0") +
    DTNow.getMilliseconds().toString();
  let id = parseInt(dispDT);
  console.log("New Object ID:", id);
  const uploadedfile = {
    _id: id,
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
    price: price,
    sell: req.body.sell,
    filename: fileuploaded.name,
  };
  let result = await dbHandle.insertdatatoCollection(DbItems, uploadedfile);
  console.log("insert item result:", result);
  const data = { status: 200, message: "檔案上傳成功!" };
  res.send(data);
});

routers.delete("/AdminItem", (req, res) => {});

routers.get("/AdminUser", async (req, res) => {
  const result = await dbHandle.queryallfromcollection(DbUsers);
  let respdata = JSON.stringify(result);
  console.log("getAdminUser resp:", respdata);
  res.send(respdata);
});

routers.post("/AdminUser", async (req, res) => {
  if (req.session.username !== "網站管理員") {
    res.status(404).send({ messge: "You didn't say the magic word!" });
    return;
  }
  console.log("AdminUser post");
  console.log("username?", req.session.username);
  console.log("req->body.action: ", req.body.action);
  console.log("req->body.email: ", req.body.email);
  switch (req.body.action) {
    case "delete":
      let resp = {
        status: RespCode.success,
        message: "作業成功，請再檢查資料庫!",
      };
      try {
        const result = await dbHandle.deleterecordfromcollection(DbUsers, {
          email: req.body.email,
        });
        console.log(result);
        resp.deleterCount = result.deletedCount;
        res.send(JSON.stringify(resp));
      } catch (error) {
        resp.status = RespCode.failure;
        resp.message = "作業失敗，請檢察資料庫!";
        res.send(JSON.stringify(resp));
      }
      break;
    case "update":
      break;
    default:
      break;
  }
});

routers.delete("/AdminUser", (req, res) => {
  console.log("email want to delete:", req.body.email);
});

routers.get("/AdminOrder", async (req, res) => {
  try {
    let result = await dbHandle.queryallfromcollection(DbOrders);
    console.log("Result: ", result);
    let finalResult = extractDBRetJSON(result);
    console.log("FinalResult: ", finalResult);
    // res.send(JSON.stringify(finalResult));
    res.send(finalResult);
  } catch (error) {
    console.log("error: ", error);
  }
});

routers.post("/AdminOrders", (req, res) => {});

routers.delete("/AdminOrders", (req, res) => {});

const extractDB = (db) => {
  let outerdata = [];
  for (const object of db) {
    if (object._id === 0)
      //skip initial db
      continue;
    //let outdata = [];
    let outdata = [];
    outdata.push(["使用者名稱: " + object.username]);
    // outdata += "----------------------------------------------------------\n";
    console.log(`This is ${object.username}'s order`);
    let orderno = 1;
    for (const indod of object.orderlist) {
      //console.log(object.username + "'s " + orderno++ + " order: ", indod + "\n");
      for (const obj of indod) {
        let temp = "";
        if (obj.orderid !== undefined)
          temp += "訂單編號 :" + obj.orderid + "\n";
        if (obj.id !== undefined) {
          temp +=
            "內容簡述: " +
            obj.id +
            " 名稱:" +
            obj.name +
            " 價格:" +
            obj.price +
            "\n 明細:\n" +
            " 鏡頭環:" +
            obj.detail.lensRing +
            " 側邊按鍵:" +
            obj.detail.sideButton +
            " 充電環:" +
            obj.detail.magsafe +
            " 掛繩:" +
            obj.detail.lanyard +
            " 價格:" +
            obj.detail.price +
            " 數量:" +
            obj.quantity +
            "\n";

          outdata.push(temp);
        }
      }
      console.log("outdata: " + outdata);
      // outdata += "----------------------------------------------------------\n";
      // console.log(outdata);
      /*for(const eachind of indod){
				//console.log("Each Ind:", eachind);
				if(eachind.orderid !== undefined){
					outdata += "訂單編號: " + eachind.orderid + ":\n";
					//console.log("outdata for orderid:", outdata);
					}
				if(eachind.id !== undefined){
					outdata += "商品概述: "+ eachind.id + " 商品名稱:" + eachind.name + "," + " 價格: " + eachind.price + "," + "明細:\n" + "鏡頭環:" + eachind.detail.lensRing + "," + " 側邊按鍵:" + eachind.detail.sideButton + "," + " 充電環: " + eachind.detail.magsafe + " 掛繩:" + eachind.detail.lanyard + " 價錢:" + eachind.detail.price + " 數量:" + eachind.quantity;
					//console.log("outdata for detail:", outdata);
				}
				console.log(outdata);
				}*/
    }
    outerdata.push(outdata);
  }
  console.log("outerdata: ", outerdata);
  return outerdata;
};

const extractDBRetJSON = (db) => {
  let OuterArray = [];
  for (const object of db) {
    if (object._id === 0)
      //skip initial db
      continue;
    let innerArray = [];
    let firstArray = [`使用者名稱: ${object.username}`];
    let insidedata = "";
    let secondArray = [];
    //outdata += "----------------------------------------------------------\n";
    //console.log(`This is ${object.username}'s order`);
    //let orderno = 1;
    for (const indod of object.orderlist) {
      //console.log(object.username + "'s " + orderno++ + " order: ", indod + "\n");
      for (const obj of indod) {
        if (obj.orderid !== undefined) {
          insidedata = `<p align=left>訂單編號: ${obj.orderid}</p>`;
          //outdata += "訂單編號 :" + obj.orderid + "\n";
        }
        if (obj.id !== undefined) {
          insidedata +=
            "<p align=left>" +
            " 內容簡述: " +
            obj.id +
            " 名稱:" +
            obj.name +
            " 價格:" +
            obj.price +
            "明細:" +
            " 鏡頭環:" +
            obj.detail.lensRing +
            " 側邊按鍵:" +
            obj.detail.sideButton +
            " 充電環:" +
            obj.detail.magsafe +
            " 掛繩:" +
            obj.detail.lanyard +
            " 價格:" +
            obj.detail.price +
            " 數量:" +
            obj.quantity +
            "</p>";
          // insidedata += "</p>";
        }
      }
      secondArray.push(insidedata);
      //outdata += "----------------------------------------------------------\n";
      //console.log(outdata);
    }

    OuterArray.push([firstArray, secondArray]);
  }
  return OuterArray;
};
/* 原本的版本，輸出就是一堆字串，上面的版本要改成JSON，所以先留在這邊以供參考用
const extractDB = (db)=>{
	for (const object of db){
		if(object._id === 0)	//skip initial db
			continue;
		let outdata = "使用者名稱: " + object.username + "\n";
		outdata += "----------------------------------------------------------\n";
		console.log(`This is ${object.username}'s order`);
		let orderno = 1;
		for(const indod of object.orderlist){
			//console.log(object.username + "'s " + orderno++ + " order: ", indod + "\n");
			for (const obj of indod){
				if(obj.orderid !== undefined)
					outdata += "訂單編號 :" + obj.orderid + "\n";
				if(obj.id !== undefined){
					outdata += "內容簡述: " + obj.id + " 名稱:" + obj.name + " 價格:"+ obj.price + "\n 明細:\n" + " 鏡頭環:" + obj.detail.lensRing +
					" 側邊按鍵:" + obj.detail.sideButton + " 充電環:" + obj.detail.magsafe + " 掛繩:" + obj.detail.lanyard + " 價格:" + obj.detail.price
					+ " 數量:" + obj.quantity + "\n";
				}
			}
			outdata += "----------------------------------------------------------\n";
			console.log(outdata);
			}			
		}
	};
 */

module.exports = routers;
