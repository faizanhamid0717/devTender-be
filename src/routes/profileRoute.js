const express = require("express");
const profileRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
// get user profile
profileRouter.get("/profile/view", authMiddleware, async (req, res) => {
  try {
    const user = req.user; //  user is set in the auth middleware\

    res.send(user);
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
  }
});

profileRouter.patch(
  "/profile/edit",
  authMiddleware,
  async (req, res) => {
    try {
      validateProfileData(req);
      const loggedInUser = req.user;
      Object.keys(req.body).forEach((key)=>{
        loggedInUser[key]=req.body[key]
      })  
      await loggedInUser.save();
      res.send({ message: "Profile updated successfully", user: loggedInUser})
   
    } catch (error) {
      res.status(400).send("Error updating profile :" + error.message);
    }
  }
);

module.exports = profileRouter;
