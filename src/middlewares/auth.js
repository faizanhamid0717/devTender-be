// read the token from the request cookies
// validate the token
// find the user
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const authMiddleware = async (req, res, next) => {
  try {
    const cookies = req.cookies || {};
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    const decodedObj = await jwt.verify(token, "DEVT_INDER_SECRET_KEY");
    const { _id } = decodedObj;
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }
    req.user = user; // attach user to request object
    if (typeof next !== "function") {
      console.error("authMiddleware: 'next' is not a function", typeof next);
      return res
        .status(500)
        .send("Server error: middleware 'next' is not callable");
    }
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token", +error.message);
  }
};

module.exports = { authMiddleware };
