const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);
// when we do .find({fromUserId:'45678fyu898789'}) on fromUserId and toUserId we get faster results
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
connectionRequestSchema.pre("save", function () {
  // check if fromUserId and toUserId are same
  const connectionRequest = this;
  if (
    connectionRequest.fromUserId &&
    connectionRequest.toUserId &&
    connectionRequest.fromUserId.equals(connectionRequest.toUserId)
  ) {
    throw new Error("You cannot send request to yourself");
  }
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
