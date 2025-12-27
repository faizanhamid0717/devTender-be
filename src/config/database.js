const mongoose = require("mongoose");
// require("dotenv").config();

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = { connectToDatabase }; // Clear existing models to prevent OverwriteModelError
