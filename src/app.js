const express = require('express');
const app = express()   // create an express application or server


app.use("/hello",(req,res)=>{
    res.send('Hello from /hello/2 endpoint');
})

app.get("/user",(req,res)=>{
    res.send({name:'Faizan',age:22});
})
app.post("/user",(req,res)=>{
    res.send('Post request to /user endpoint received');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})