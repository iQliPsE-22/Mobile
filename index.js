const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Allow anyone for the request
// const { User } = require("./models");
const connectToDatabase = require("./db"); // Adjust the path as needed

connectToDatabase();

const server = express();
server.use(cors());
server.use(bodyParser.json());

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  confirm: String,
});

const ContactSchema = new mongoose.Schema({
  username: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", UserSchema);
const Contact = mongoose.model("Contact", ContactSchema);

server.post("/user", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { username, email, phone, password, confirm } = req.body;

    const user = new User({
      username,
      email,
      phone,
      password,
      confirm,
    });

    const savedUser = await user.save();
    console.log("User saved successfully:", savedUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ username, password }).exec();
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  return res.status(200).json({ message: "Login successful", user });
});

server.post("/contact", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { username, email, message } = req.body;

    const contact = new Contact({
      username,
      email,
      message,
    });

    const savedContact = await contact.save();
    console.log("Contact saved successfully:", savedContact);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Error creating contact" });
  }
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});
