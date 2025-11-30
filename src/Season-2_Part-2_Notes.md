1. 🔥🔥🔥🔥🔥🔥 Episode 2.8 🔥🔥🔥🔥🔥
   validations on database inside schema// for put patch and post Api because of these we add data in DB  
   // go to mongoose doc and schek schema https://mongoosejs.com/docs/guide.html

// custome validation :- by wrighting ouen function insidd schema like this
gender: { type: String,
validate(value){
if(["male","female","other"].includes(value)){
throw new Error("Gender is not valid");  
 }} },
-- this will work by defualt only when we create new user not in update so for this we have to pass validator inside update method  
 try {
const updateUser = await UserModel.findByIdAndUpdate(
data.id,  
 data,
{runValidators: true,}

    );}

-- inside schema we can add time stamp ,{ timestamps: true } by this it adds created at and updated at like this
createdAt
2025-11-29T09:28:13.173+00:00
updatedAt
2025-11-29T09:28:13.173+00:00

API level validation always add dont beleive on ui
// eg not allow user to update email-id while updation an details

// for validation use validator library https://www.npmjs.com/package/validator

NEVER TRUST REQ.BODY // ATTACKER CAN SEND ANY VIRUS DATA INTO REQ.BODY DATABASE

2. 🔥🔥🔥🔥🔥🔥 Episode 2.9 🔥🔥🔥🔥🔥
   Eycrypt the password
   correct out signup api Step
1. validation of data
1. Encrypt the password // npm package bcrypt
1. store user in DB
   bcrypt.hash(password,salt round ) use as 10 good number
   bcrypt.compare(password,hashpassword from db)
