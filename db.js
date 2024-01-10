const mongoose = require("mongoose");

async function connectToDatababase() {
  mongoose
    .connect("mongodb+srv://iqlipse22:Uprvmz9ikr@cluster0.xkqjppx.mongodb.net/")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("error");
    });
}
module.exports = connectToDatababase;
