const express = require("express");
const { connectToDatabase } = require("./config/database");
const UserModel = require("./models/userSchema");
const { validateSignUpData } = require("./utils/validation");
const app = express(); // create an express application or server
const bcrypt = require("bcrypt");
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log({ passwordHash });
    const User = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });
    await User.save();
    res.status(201).send("User signed up successfully");
  } catch (error) {
    res.status(400).send("Error signing up user :" + error.message);
  }
});

// login user
app.post("/login",async(req,res)=>{
  try {
    const {emailId,password}=req.body;
     const user = await UserModel.findOne({ emailId });
     if (!user) {
       return res.status(404).send("invalid credentials");
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid credentials");
      }
      res.send("Login successful");
  } catch (error) {
    res.status(400).send("Error logging in user :" + error.message);
  }
})

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
app.patch("/updateuser/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  console.log(data);
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }
    if (data.skills && data.skills.length > 3) {
      throw new Error("Skills should not be more than 3");
    }
    const updateUser = await UserModel.findByIdAndUpdate(id, data, {
      runValidators: true,
    });
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
