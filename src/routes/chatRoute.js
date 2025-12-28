const express = require("express");
const ChatModel = require("../models/chatSchema");
const { authMiddleware } = require("../middlewares/auth");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", authMiddleware, async (req, res) => {
  const { targetUserId } = req.params;
  const loggedInUser = req.user._id;
  try {
    // let chat = await ChatModel.findOne({
    //   participents: { $all: [loggedInUser, targetUserId] },
    // })
    let chat = await ChatModel.findOne(
      { participents: { $all: [loggedInUser, targetUserId] } }, // filter
      { messages: { $slice: -5 } } // ✅ latest few chats
    ).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    if (!chat) {
      chat = new ChatModel({
        participents: [loggedInUser, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
module.exports = chatRouter;
