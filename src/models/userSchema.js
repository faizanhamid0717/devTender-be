const mongoose = require("mongoose");
const validator = require("validator"); // using validator library for data validation  https://www.npmjs.com/package/validator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4 },
    lastName: { type: String, required: true },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      // validate(value) {
      //   if (!validator.isStrongPassword(value)) {
      //     throw new Error("Password must be at least 6 characters long");
      //   }
      // },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    about: { type: String, default: "This is default datsils of user" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "DEVT_INDER_SECRET_KEY", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
 const hashPaswordFromDB=this.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPaswordFromDB);
  return isPasswordValid;
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
