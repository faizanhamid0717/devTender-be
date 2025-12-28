const mongoose = require("mongoose");
// single message structure
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// chat structure
const chatSchema = new mongoose.Schema({
  participents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [messageSchema],
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
