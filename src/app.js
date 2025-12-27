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
const paymentRouter = require("./routes/paymentRoute");
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // to allow cookies to be sent
  })
);

// Use the routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

// Start the server after connecting to the database
connectToDatabase()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(process.env.port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
