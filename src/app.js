const express = require("express");
const { connectToDatabase } = require("./config/database");
const UserModel = require("./models/userSchema");
const { validateSignUpData } = require("./utils/validation");
const app = express(); // create an express application or server
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const User = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });
    await User.save();
    res.status(201).send("User signed up successfully");
  } catch (error) {
    res.status(400).send("Error signing up user :" + error.message);
  }
});

// login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    // generate jwt token here inside schema file using schema method and add it to cookie and send response to user
    const token = await user.generateJWT();
    res.cookie("token", token,{expires:new Date(Date.now()+86400000),httpOnly:true});
    res.send("Login successful");
  } catch (error) {
    res.status(400).send("Error logging in user :" + error.message);
  }
});

// get user profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; //  user is set in the auth middleware\

    res.send(user);
  } catch (error) {
     res.status(401).send("Unauthorized: Invalid token");
  }
});

// Start the server after connecting to the database
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
