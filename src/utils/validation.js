const validator = require("validator");
// const bcrypt = require("bcrypt");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Error :" + error.message);
  }
};

const validateProfileData = (req) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = req.body;
  const allowedEditfields = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "skills",
    "photoUrl",
    "age",
     ]

    const isEditAllowed = Object.keys(req.body).every(field=>allowedEditfields.includes(field))
    if(!isEditAllowed){
      throw new Error("Error: Attempt to edit restricted fields")
    }
    return isEditAllowed

}
module.exports = { validateSignUpData, validateProfileData };