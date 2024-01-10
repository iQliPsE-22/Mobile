const mongoose = require("mongoose");

async function connectToDatababase() {
  mongoose
    .connect(
      "mongodb+srv://iqlipse22:Uprvmz9ikr@rizzquiz.uef0j36.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("error");
    });
}
module.exports = connectToDatababase;
