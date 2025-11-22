const express = require('express');
const app = express()   // create an express application or server

app.use("/user",[(req,res,next)=>{
    // res.send("Welcome to DevTinder Backend")
    next()
},(req,res,next)=>{
    // res.send("This is second callback")
    next()
}],(req,res,next)=>{
    res.send("This is 3rd callback")
    next()
},(req,res,next)=>{
    res.send("This is 4th callback")
    // next()
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})