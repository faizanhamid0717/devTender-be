const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const PaymentModel = require("../models/paymentSchema");
const { menbershipAmount } = require("../utils/constants");
const {
  validatePaymentVerification,
  validateWebhookSignature,
} = require("./dist/utils/razorpay-utils");
const UserModel = require("../models/userSchema");
// create order Api
paymentRouter.post("/payment/create", authMiddleware, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    // create order
    const order = await razorpayInstance.orders.create({
      amount: menbershipAmount[membershipType] * 100, // Amount is in currency subunits.
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    });
    // save order in db in new collections
    const payment = new PaymentModel({
      userId: req.user._Id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    // send order details to frontend and toJSON() sends required data
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZOR_PAY_KEY_ID });
  } catch (error) {
    return res.status(500).json({ msg: error, message });
  }
});

// create webhook Api
// this api call gets by razorpay on success or failure payment while create webhook on razorpay app we put this api there
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringfy(req.body),
      webhookSignature,
      process.env.RAZOR_PAY_WEBHOOK_SECRET
    ); // return boolean
    if (!isWebhookValid) {
      return res.status(400).json({ msg: "webhook signature is invalid " });
    }

    // update my payment status in DB
    // update the user as premium
    // return success response to rezorpay
    // this paymentDetails we get from razorpay
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await PaymentModel.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();

    // now update user
    const user = await UserModel.findOne({ _id: payment.userId });
    user.premium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    if (req.body.event === "payment.captured") {
    }
    if (req.body.event === "payment.failed") {
    }
    res.status(200).json({ msg: "webhook received successfully " });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = paymentRouter;
