
const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const authRouter = express.Router();
const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");

// signup user

authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async(req,res)=>{
res.clearCookie("token",null,{expires:new Date(Date.now())});
  res.send("Logout successful");
})

module.exports = authRouter;



