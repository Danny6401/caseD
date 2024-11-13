const fs = require("fs");
const express = require("express");
const routers = express.Router();
const dbQuery = require("../database/dbQuery");

routers.get("/", (req, res)=>{
    fs.readFile("./template/caseItems.html", (err, data)=>{
        res.write(data);
        res.end();
    })
    // console.log("caseItems.get");
})
routers.post("/", (req, res)=>{
    console.log("caseItems.post");
})
module.exports = routers;