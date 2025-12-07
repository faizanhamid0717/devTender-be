const express = require("express");
const requestRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequestSchema");
const UserModel = require("../models/userSchema");
requestRouter.post(
  "/request/send/:status/:toUserId",
  authMiddleware,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;
      const allowedstatus = ["ignored", "intrested"];
      if (!allowedstatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // check if toUserId exists in my DB
      const userExists = await UserModel.findById(toUserId);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      // if fromUserId and toUserId are same we check this in pre save hook of schema

      // Check if a request already exists
      const existingRequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: `Request ${status} sent successfully`,
        data: data,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  authMiddleware,
  async (req, res) => {
    try {
      // check is loggedIn userId is equal to toUserId of requestId
      // check if existing status is intrested -> can be accepted or rejected
      // validation- if allowed status is accepted or rejected
      /// validation - if requestId exists
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedstatus = ["accepted", "rejected"];
      if (!allowedstatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found or already reviewed",
        });
      }

      connectionRequest.status = status; // modify the status from intrested to accepted or rejected
      const data = await connectionRequest.save();
      res.json({
        message: `Request ${status} successfully`,
        data,
      });
    } catch (error) {
      console.error(
        "[request/review] caught error:",
        error && error.stack ? error.stack : error
      );
      res
        .status(400)
        .send({ "Error message": error.message, stack: error.stack });
    }
  }
);

module.exports = requestRouter;
