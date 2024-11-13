const firebase = require("firebase");
//const {querycollectionExist} = require("./dbOperations");
const firebaseConfig = {
  apiKey: "AIzaSyC0iV4bPBrem6IO4gt0gECkaw7WG2CpcG0",
  authDomain: "lccfproject.firebaseapp.com",
  databaseURL:
    "https://lccfproject-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lccfproject",
  storageBucket: "lccfproject.appspot.com",
  messagingSenderId: "839331477269",
  appId: "1:839331477269:web:e3839fdf59547104d71b1c",
};

const user = "user",
  order = "order",
  merchantdise = "merchantdise";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

/*const builddb = (function () {
  querycollectionExist(`${user}`, (value, dataexist) => {
    console.log("DB: ", value, " exists: ", dataexist);
    if (!dataexist) {
      database.ref(`${user}`).set("root");
      console.log("user created");
    }
  });
  // querycollectionExist(`${order}`, (value, dataexist) => {
  querycollectionExist(`${order}`, (value, dataexist) => {
    console.log("order Value:", value, ";dataExists: ", dataexist);
    if (!dataexist) {
      // database.ref(`${order}`).set("initial");
      const document = database.ref(`${order}`);
      const finaldb = document.child("initial");
      finaldb.set({ color: "Red", itemIndex: 0 });
      console.log("order created");
    }
  });
  querycollectionExist(`${merchantdise}`, (value, dataexist) => {
    console.log("merchantdise Value:", value, ";dataExists: ", dataexist);
    if (!dataexist) {
      // database.ref(`${merchantdise}`).set("item0");
      const document = database.ref(`${merchantdise}`);
      const finaldb = document.child("item0");
      finaldb.set({ color: "Red", number: 0 });
      console.log("merchantdise created");
    }
  });
})();*/

async function querycollectionExist(name, callbackfunc) {
  // console.log("DB Name: ", name);
  try {
    const ref = database.ref(name);
    const snapshot = await ref.once("value");
    let value = snapshot.exists();
    console.log("DB Exists return: ", value);
    if (snapshot.exists()) {
      callbackfunc(name, true);
      return true;
    } else {
      callbackfunc(name, false);
      return false;
    }
  } catch (error) {
    console.log("DB querycollectionExist: ", name, "error!");
    return false;
  }
}
// let userref = database.ref(`${user}`);
// console.log("userref: ", userref);
// let userref2 = database.ref("user2");
// console.log("userref2: ", userref2);
// database.ref(`${user}`).set("root");
// database.ref(`${order}`).set("initial");
// database.ref(`${merchantdise}`).set("item0");

/*let data = {
  zoo1: {
    animal: "monkey",
    color: "gray",
  },
  zoo2: {
    animal: "tiger",
    color: "yellow",
  },
}
let data2 = {
  zoo3: {
    animal: "monkey",
    color: "gray",
  },
  zoo4: {
    animal: "tiger",
    color: "yellow",
  },
}*/

// writeToDatabase(data);
// querycollectionExist("zoo1", getStatus);

module.exports = { database };
