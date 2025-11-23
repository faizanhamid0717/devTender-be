const express = require("express");
const { connectToDatabase } = require("./config/database");
const UserModel = require("./models/userSchema");
const app = express(); // create an express application or server

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res) => {
  const userData = req.body;
  const User = new UserModel(userData);

  try {
    await User.save();
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
