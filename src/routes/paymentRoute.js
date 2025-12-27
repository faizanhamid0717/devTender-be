const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", authMiddleware, async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = paymentRouter;
