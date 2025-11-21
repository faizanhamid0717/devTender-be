const express = require('express');
const app = express()   // create an express application or server

app.use('/test',(req,res)=>{
   res.end('Hello World by nodemon');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})