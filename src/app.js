const express = require("express");
const app = express(); // create an express application or server
const {adminAuth,userAuth} = require("./middlewares/auth");
 app.use("/admin",adminAuth)
//  app.use("/user",userAuth)

app.get("/user/profile",userAuth, (req, res) => {
  res.send("Authorized Access Granted");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Authorized Access Granted");
});

app.delete("/admin/delete", (req, res) => {
  res.send("Authorized Delete Access Granted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
