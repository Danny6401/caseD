const fs = require("node:fs");
const express = require("express");
const routers = express.Router();

routers.post("/", (req, res) => {
  console.log("Home Post~");
});

routers.get("/", (req, res) => {
  console.log("Home Get~");
  if (req.session.username != undefined)
    console.log("user: ", req.session.username["name"]);
  if (req.session.admin != undefined) console.log("admin:?", req.session.admin);
  fs.readFile("./template/index.html", (error, data) => {
    console.log("req.session.username: ", req.session.username);
    if (req.session.username) {
      console.log("session exist");
      let htmlstring = data.toString("utf8");
      const bodyIndex = htmlstring.indexOf("<body>");
      if (bodyIndex !== -1) {
        //說實在的，這段有點醜
        // 將 <body> 和 </body> 中間的內容進行分割並插入彈窗訊息
        //6=><body>
        let modifiedContent =
          htmlstring.slice(0, bodyIndex + 6) +
          `<script>
                        alert('登入成功，歡迎回來, ${req.session.user.name}!');
                    </script>` +
          htmlstring.slice(bodyIndex + 6);

        // 回傳修改過的 HTML
        const string = '<p id="username">';
        const usernamIndex = modifiedContent.indexOf(string);

        if (usernamIndex != -1) {
          modifiedContent =
            modifiedContent.slice(0, usernamIndex + string.length) +
            `${req.session.user.name}` +
            modifiedContent.slice(usernamIndex + string.length);
        }
        const loginLink = '<a href="./login">登入</a>';
        const loginIndex = modifiedContent.indexOf(loginLink);
        console.log("loginIndex: ", loginIndex);
        if (loginIndex != -1)
          modifiedContent =
            modifiedContent.slice(0, loginIndex) +
            " " +
            modifiedContent.slice(loginIndex + loginLink.length);
        res.send(modifiedContent);
        console.log(modifiedContent);
      }
      //   const modifiedData = data.replace('</body>', `
      //     <script>
      //         alert('登入成功，歡迎回來, ${req.session.user.name}!');
      //     </script>
      //     </body>
      // `);
      else {
        console.log("send origin");
        res.write(data);
        res.end();
      }
    } else {
      console.log("session expires/NA");
      res.write(data);
      res.end();
    }
  });
});

module.exports = routers;
