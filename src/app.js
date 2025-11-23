const express = require("express");
const { connectToDatabase } = require("./config/database");
const UserModel = require("./models/userSchema");
const app = express(); // create an express application or server

app.post("/signup", async (req, res) => {
  const user = new UserModel({
    firstName: "Faheem",
    lastName: "Hamid",
    emailId: "faheemw09@gmail.com",
    password: "faheem123",
    age: 27,
    gender: "male",
  });
  try {
    await user.save();
    res.status(201).send("User signed up successfully");
  } catch (error) {
    res.status(400).send("Error signing up user :" + error.message);
  }
});

connectToDatabase()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
