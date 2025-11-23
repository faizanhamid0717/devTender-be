const express = require("express");
const app = express(); // create an express application or server


app.get("/getUserData", (req, res) => {
    try {
        res.send("user data!");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  
});

// use at end of all routes
app.use("/", (err, req, res, next) => {
  if (err) {
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
