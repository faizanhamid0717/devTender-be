const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequestSchema");
const UserModel = require("../models/userSchema");
const userRouter = express.Router();

// Get all the pending requests for the logged-in user
userRouter.get("/user/requests/received", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "intrested", // other wise we get all requests
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
    ]); // populate fromUserId to get user details
    res.json({
      message: "Pending requests fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get connection of logged in user
userRouter.get("/user/connections", authMiddleware, async (req, res) => {
  try {
    // find all accepted connections for logged in user eith we have accepted or our sent request is accepted by other user
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
      ]); // populate both fromUserId and toUserId to get user details
    // Using map to extract only the connected user details from the connections not the entire connection request document
    // actually id in Db is in this format ObjectId("60c72b2f9b1d8c001c8e4f3a")
    // so we need to convert it to string to compare using toString()
    const finalData = connections.map((ele) => {
      if (ele.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return ele.toUserId;
      }
      return ele.fromUserId;
    });
    res.json({
      message: "Connections fetched successfully",
      data: finalData,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = userRouter;

// feed Api
// we fetch user form UserModel where all data is prenet
// user should see all cards of users except :-
// his own card
// his connections
// ignored people
// already send the request
/**
 * /feed/:staus/:id    -- there are called params we get it from req.params
 * /feed?page=1&limit=10 -- after question mark these are called query params we get it from req.query
 */
userRouter.get("/feed", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const pageNo = parseInt(req.query.page) || 1; // default page is 1
    let limit = parseInt(req.query.limit) || 10; // default limit is 10
    limit = limit > 50 ? 50 : limit; // max limit is 50
    const skip = (pageNo - 1) * limit; // calculate skip value for pagination

    const connectionAlreadySendOrReceived = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    const hideUsersFromFeed = new Set(); // set is used if put an element twice it will store only once
    connectionAlreadySendOrReceived.forEach((ele) => {
      hideUsersFromFeed.add(ele.fromUserId.toString());
      hideUsersFromFeed.add(ele.toUserId.toString());
    });

    const finalUsers = await UserModel.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
      ], // convert set to array
    })
      .select("firstName lastName age gender about skills photoUrl")
      .skip(skip)
      .limit(limit);
    res.json({
      message: "Feed fetched successfully",
      data: finalUsers,
    });
  } catch (error) {
    res.status(400).send({ "message:-": error.message });
  }
});
