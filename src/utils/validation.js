const validator = require("validator");
// const bcrypt = require("bcrypt");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  console.log({test:req.body});
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be at least 6 characters long");
  }
};


module.exports = { validateSignUpData };