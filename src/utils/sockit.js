const socket = require("socket.io");
const crypto = require("crypto");
const ChatModel = require("../models/chatSchema");
const ConnectionRequestModel = require("../models/connectionRequestSchema");
const getSecretRoomId = (_id, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([_id, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // ... Handel events
    socket.on("joinChat", ({ firstName, _id, targetUserId, photoUrl }) => {
      // console.log({ firstName, _id, targetUserId, photoUrl });
      // create room between when user open chat of any user
      // const room = "uniqueId"; create unique id with 2 user ids
      // if we dont sort the root id will not match because when opposite user join so thta user becomes the userId now and id interchanges
      // { Faizan: '694d20af8c6cdcf57dc81075_694d21f58c6cdcf57dc81096' } user 1
      // { Anas: '694d21f58c6cdcf57dc81096_694d20af8c6cdcf57dc81075' }  opposite user
      // here room id mismatch room will not be created\

      // make room id complx for not getting attack
      // const roomId = [_id, targetUserId].sort().join("_");
      const roomId = getSecretRoomId(_id, targetUserId);
      console.log({ firstName, " joined ": roomId });
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, _id, targetUserId, text, photoUrl }) => {
        // save message in db
        try {
          const roomId = getSecretRoomId(_id, targetUserId);
          let chat = await ChatModel.findOne({
            participents: { $all: [_id, targetUserId] },
          });

          // check if _id and targetUserId are friends are not
          // Home work
          // const data = ConnectionRequestModel.findOne({
          //   status: "accepted",
          //   fromUserId: _id,
          //   toUserId: targetUserId,
          // });

          // if chat is not there then this is an first intraction
          if (!chat) {
            chat = new ChatModel({
              participents: [_id, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: _id,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", {
            firstName,
            text,
            photoUrl,
            _id,
          });
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
