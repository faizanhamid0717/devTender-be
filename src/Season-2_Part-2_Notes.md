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

1. 🔥🔥🔥🔥🔥🔥 Episode 2.10 🔥🔥🔥🔥🔥
   JWT, Authantication, cookies , cookies parser, validate user , Auth middleware
   -- on every any api call server need to verify the user using token
   -- when we login once it verify email pass, the server send jwt token and user save it in browser and when user hit any api it send the jwt token back to server and it verify it and give responce

--COOKIES :- when we login in the server send responce and rape jwt token inside cookies and send to user and brower store that cookies

-- we can also maintain expire date for this cookies
-- express give use the method to store this cookie res.cookie(name, value [, options]) , https://expressjs.com/en/5x/api.html#res.cookie

-- for reading this cookie once get this through APIs we use npm i cookie-parser , cookies parser middleware app.use(cookieParser())

-- jwt json web token https://www.jwt.io/
tokon devided into 3 things in 3 different color , Header , Payload ,Signiture we can check in jwt.io
-- for creating jwt token we use npm package json web token npm i jsonwebtoken
-- jwt.sign({\_id:user.\_id}) we are use id here so whe we generate token this user id is gets hidden save in that token
-- const decoded = jwt.verify(token,"DEVT_INDER_SECRET_KEY"); we can then verify our token in all APIs so inside this decoded i will get the id like this { decoded: { \_id: '692bbae5bfe8762753c3f82e', iat: 1764478147 } }

-- doing all above steps for all APIs in eacj API saperately is not good so we creat a middleware called Auth middleware
-- we can verify token in this middle ware and use next , this next will call this async after present userAuth middleware
app.get("/profile", userAuth, async (req, res) => {
try {
const user = req.user; // user is check in the auth middleware so we right like this
res.send(user);
} catch (error) {
res.status(401).send("Unauthorized: Invalid token");
}
});

-- expire jwt expiresIn: "1d",
-- expire cookie {expires:new Date(Date.now()+86400000),httpOnly:true}

--MONGOOSE SCHEMA METHODS--
insted of creating token directly inside login api we ceate into schema method inside schema file use userSchema.methods
and we dont use arrow function because this key word has different behavoiur with arrow function it will not work

-- we can also saperate validate function to bcrypt inside schema insted of doing inside login directly

4. 🔥🔥🔥🔥🔥🔥 Episode 2.11 🔥🔥🔥🔥🔥
   craeting Apis of dev tinder
   insted of wright all APIs inside app.js, we use exprss.router in sapearte files just group related APIs inside one route

// now we create saperate folder of router then inside that create our roter files -- earlier we are wrighting APIs inside app.js using app.use() similarly we wright same way but just change aap.use() to authRouter.use()

and we call inside app.js
// Use the routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

when any api call happen it gets the route and it goes one by one in this route if it find the routr we are send the resuest from that api so then it will not move to next route

// -- Logout work---
we know user login using token and cookie , we can simpley send cookies token as null and expire it right there so if user dont have cookies token he can not able to access any api
