const express = require("express");
const { connectToDatabase } = require("./config/database");
const UserModel = require("./models/userSchema");
const app = express(); // create an express application or server

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res) => {
  const userData = req.body;
  const User = new UserModel(userData);

  try {
    await User.save();
    res.status(201).send("User signed up successfully");
  } catch (error) {
    res.status(400).send("Error signing up user :" + error.message);
  }
});

// get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("Error fetching users :" + error.message);
  }
});

// get one user
app.get("/user", async (req, res) => {
  const userAge = req.body.age;
  try {
    const User = await UserModel.findOne({ age: userAge });
    if (!User) {
      res.status(404).send("User not found");
    } else {
      res.send(User);
    }
  } catch (error) {
    res.status(404).send("Error fetching user :" + error.message);
  }
});

// get user by id
app.get("/userbyid", async (req, res) => {
  const ID = req.body.id;
  try {
    const UserId = await UserModel.findById({ _id: ID });
    if (!UserId) {
      res.status(404).send("User not found");
    } else {
      res.send(UserId);
    }
  } catch (error) {
    res.status(404).send("Error fetching user by ID :" + error.message);
  }
});

// update user by id
app.patch("/updateuser", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      data.id,  
      data
      //   {
      //     firstName: data.firstName,
      //     emailId: data.emailId,
      //     age: data.age,
      //     gender: data.gender,
      //   },
    );
    res.send("User updated successfully: " + updateUser);
  } catch (error) {
    res.status(404).send("Error updating user :" + error.message);
  }
});

// deleyte user by id
app.delete("/deleteuser", async (req, res) => {
  const ID = req.body.id;
  try {
    const data = await UserModel.findByIdAndDelete(ID);
    if (!data) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.status(404).send("Error deleting user :" + error.message);
  }
});
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
