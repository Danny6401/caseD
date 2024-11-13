const { database } = require("./dbConnect.js");
const verifyOK = 0,
  verifyFail = 1,
  userDoesnoExist = 2;
const dbQuery = {
  dbQuery: function (key, value) {
    const ref = database.ref("merchantdise");

    // dbConnection.
  },
  dbQueryUser: function (user, password, callback) {
    const ref = database.ref(`user/${user}`);
    ref.once("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        // console.log("DB Exists");
        if (snapshot.val().password == password) callback(verifyOK);
        else callback(verifyFail);
        return true;
      } else {
        console.log("DB Fail");
        callback(userDoesnoExist);
        return false;
      }
    });
    // console.log("QueryUser: ", ret);
  },
};
/*function dbQuery(key, value) {
  const ref = database.ref("merchantdise");
}
function dbQueryUser(user, password, callback) {
  const ref = database.ref(`user/${user}`);
  ref.once("value", (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      if (snapshot.val().password == password) callback(verifyOK);
      else callback(verifyFail);
      return true;
    } else {
      console.log("DB Fail");
      callback(userDoesnoExist);
      return false;
    }
  });
}*/
module.exports = {
  dbQuery,
  //   dbQueryUser,
  verifyOK,
  verifyFail,
  userDoesnoExist,
};
