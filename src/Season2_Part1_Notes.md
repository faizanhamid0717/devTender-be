🔥🔥🔥🔥🔥🔥 1. Episode 2.0    🔥🔥🔥🔥🔥
Project :- DevTinder 

🔥🔥🔥🔥🔥🔥 2. Episode 2.1   🔥🔥🔥🔥🔥
Waterfall model  How company works
Requirements  
   Design
     Development
       Testing 
           Deployment
                 Maintainance

Requiremts :- Define by Product Manager and they work with designer figma team

Design :- done by senior Engineer/ Manager, tech stack, microserves

Development : SD1 SD2

Testing : testing team 

Deployment :- by dev teams and DevOps teams take care of servers

Maintainance :- new requirement and follow all steps 

3. Architecture
a. monolith 
b. MicroServices

  1. Monolith :-Entire application is built as one single servicer repo may be multiple Everything runs from one server.
If this server crashes → whole app goes down.

  2. MicroServices : Microservices refer to splitting the backend into multiple small, independent services not for frontend .eg, cms, workshops, assessments, emails,
  Each service:
  Has its own codebase
  Has its own database
  Runs as a separate server
  Can be deployed independently

🔥🔥🔥🔥🔥🔥 4. Episode 2.2    🔥🔥🔥🔥🔥🔥
DevTinder :- Requirement 
  1. create account
  2. login 
  3. create your profile
  4. feed page - explore other users
  5. send connection request
  6. see our matches / who accepted our connection
  7. see the request we have sent
  8. update your profile

DevTinder :- Design 
  1. DB design
  
collections based on features
  a. user collections [create account,login,update profile]:- firstname,lastname,password,email,age,gender etc

  b. connectionRequest collection[connection request] complex part we have to save the relationship 
  who is sending , whom he is sending and what is the status 
  from userId, to userId status

  2. APIs design
  REST APIs
  HTTP methods
  GET,POST,PUT,PATCH,DELETE
  API need :-
  1. signup POST
  2. login POST
  3. profile GET
  4. update POST,PATCH
  5. Delete 
  6. send request POST - ignore-intrested
  7. reviewRequest POST - accept - reject
  8. requests received GET
  9. get connections GET

🔥🔥🔥🔥🔥🔥 5. Episode 2.3 🔥🔥🔥🔥🔥
setup project
------------ STEPS
--create folder and open in vscode and do {npm init} in terminal
we give some details and it creates package.json with given conf{
  "name": "devtinder-be",
  "version": "1.0.0",
  "description": "tinder for devlopers",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "backend"
  ],
  "author": "Faizan",
  "license": "ISC"
}

--create src folder and inside app.js which is the entry point of node.js or our code 
--install express - node-module comes and package-lock.json all source code of express.js come inside our project we can check express folder inside node modules 
--we get other files inside node-module- because express is dependend on other libraries so we get those files as well similarly for all library which we install 

---- Package.json  we can update our version by ^ , ~
meaning or versions 4.19.2
4 - major version , 19 - minor version , 2 - patch version(Patch means - Small change any bug fix)
project start from 1.0.0
-if we do patch - 1.0.1
-if any new feature change - minor change 1.1.1
-till these 2 changes we can upgrad the version it will not brack our app
-if major change happen - 2.1.1  it brackes the chain and our app also 
-this ( ^ ) sign called caret it automatically update our patch or minor change  latest version
-this (~) called tilde only allow patch update  

----- Package-lock.json
this tells us the exact version we are using 

-- install nodemon  {npm i -g nodemon} so we don't need to run server manually if we do any change and put inside script package.json

  "scripts": {
    "start":"node src/app.js",
    "dev": "nodemon src/app.js"
  },
  now we do npm run dev inside terminal 

  -- now do {git init} - this Initialized empty Git repository and we see 500,600 file changes 

  -- create .gitignore file in root and put node_modules inside it so we will see change reduces not show 500,600

  -- then do git add . , git commit -m'', the create remote repo on github then get these command and run these it pushes all code to remote origin on github

  --$ git remote add origin https://github.com/faizanhamid0717/devTender-be.git
  --git branch -M main
  --git push -u origin main
 
🔥🔥🔥🔥🔥🔥 6. Episode 2.4 🔥🔥🔥🔥🔥🔥
  -- order of routes matter a lot
  -- for api test always use postman inside it create worksapce and for only me then craete collection for different apis 

  ///// ROUTING INPORTENT /////
 -- app.use("/ab+c",(req,res)=>{
    res.send('Hello from /hello/2 endpoint');
})
if we wright like this we can add multiple b but startand endpoint should be same a and c

 -- app.use("/ab*cd",(req,res)=>{
    res.send('Hello from /hello/2 endpoint');
})
by this we can wright any thing between but start and end ab,cd should be remain same 

 -- app.use("/ab?cd",(req,res)=>{
    res.send('Hello from /hello/2 endpoint');
})
here b is optional

🔥🔥🔥🔥🔥🔥 7. Episode 2.5 🔥🔥🔥🔥🔥🔥
Routes 
app.use("/",(req,res)=>{
   this function is called route handler
})
-- if we don't send any responce from first request handler it will not go in 2nd handler / middleware  it will hange there then we have 3 parameter given by express.js called as next() this will help go to next route handler 

-- But if we send responce form first and use next as well we get first responce and by next it goes to 2nd handler when it try to send responce  it will through error in console
-- app.use("/user",[(req,res,next)=>{
    // res.send("Welcome to DevTinder Backend")
    next()
},(req,res)=>{
    res.send("This is second callback")
}])

-- we can also put these inside array 
-- and the handler contain next() is called middleware

---MIDDLEWARE---------------------------------
app.get('/admin/getAllData',(req,res)=>{
    const token = 'mysecrettoken';
    const isAuthorised = token === 'mysecrettoken'
    if(isAuthorised){
        res.send('Authorized Access Granted');
    } else {
        res.status(401).send('Unauthorized Access Denied');
    }
  
})

app.delete("/admin/delete",(req,res)=>{
    const token = 'mysecrettoken';
    const isAuthorised = token === 'faizan'
    if(isAuthorised){
        res.send('Authorized Delete Access Granted');
    } else {
        res.status(401).send('Unauthorized Delete Access Denied');
    }
   
})

-- it is used for check authorization suppose before send data from server we have to authorise the user using token, but we can do sapertely in all routes or requests code repeating in here in this case for that logic we create middle ware and used here

--- so we can do this saperately and use next it check for all admin routes and all http requests 

app.use("/admin", (req, res, next) => {
  const token = "mysecrettoken";
  const isAuthorised = token === "mysecrettoken";
  if (!isAuthorised) {
    return res.status(401).send("Unauthorized Access Denied");
  }else{
    next();
  }
});

//--- for this we are creating saperately folders of moddleware and use 
app.use("/admin",adminAuth) , in place of wrighting function we are wrighting saperately and use function call here

-- suppose if we have only 2,3 routes, or some tiem any http request not need middleware so insted of putting in app.use we can directly put inside route or http request 

//  app.use("/user",userAuth)

app.get("/user/profile",userAuth, (req, res) => {
  res.send("Authorized Access Granted");
});

---  ERROR HANDELING ----------------------
we can show error using try catch but if some other error comes we do inisde app.use() like this but sequnce matters err should be first because it goes inside one by one err, then req,res,then next , and use this route "/" this check for all routes  app.use("/",(err,req, res, next) => {
  next();
});
we this wild card error handeling at the end of app so if anything brakes it through error and also use try catch for error 


🔥🔥🔥🔥🔥🔥 7. Episode 2.6 🔥🔥🔥🔥🔥🔥
how to coonect with DB 
1. login atlas 
2. create project by New Project 
3. create cluster use free 
4. do connect add username password and get url 

-- if we do connect .then .catch inside db file and the we require inside app.js what will happen first it listen to server then connect to db which is wrong so we just export it from there then do in app.js after connect the we listen to server 

-- when we every we craete any api use async await beacuse we do db operations eg user.save() these return promise and always use inside try cath 

-- when we create schema and model and make api call eg post user the deb created and ID itself as objectId [6922b98eb2af8532e3d384cc] and (__ v) maintain version  don't touch use these id 

🔥🔥🔥🔥🔥🔥 8. Episode 2.7 🔥🔥🔥🔥🔥🔥
difference between JSOn and JS object
1. JS Object (JavaScript Object)
✔ Used inside JavaScript code
in side this we can wright variables, function and key not inside string 
{
    firstName: "Faheem",
    lastName: "Hamid",
     greet: function () {
    console.log("Hello");
  }
  }

2. JSON (JavaScript Object Notation)
✔ Used for data storage
✔ Used for sending data between server ↔ client
✔ Lightweight and ONLY contains data, not functions
Strings must use double quotes only
{
  "name": "Faizan",
  "age": 22,
  "isAdmin": true,
  "skills": ["JS", "React"]
}

-- when we send data through body we are sending in json but out req.body is undefined because express is not able to read json so for this we have to use middleware given by express and we use loke this app.use(express.json());

-- if we want to get any data from DB so we have to use model 
here we have to get the all users so as we know users are save in db using userModel , so we have to use this model userModel.find()

---- url of mongoose documentation having all Db operations https://mongoosejs.com/docs/api/model.html 