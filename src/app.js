const express = require("express");
const { connectToDatabase } = require("./config/database");
const app = express(); // create an express application or server
const cookieParser = require("cookie-parser");
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const requestRouter = require("./routes/requestRoute");
const userRouter = require("./routes/userRoute");

// Use the routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// Start the server after connecting to the database
connectToDatabase()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
