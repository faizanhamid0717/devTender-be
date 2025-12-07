const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    "mongodb+srv://Faizan:devtinder@devtindercluster.pfs6tg7.mongodb.net/devtinder"
  );
};

module.exports = { connectToDatabase }; // Clear existing models to prevent OverwriteModelError
