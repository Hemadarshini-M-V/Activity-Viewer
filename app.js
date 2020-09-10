//Imports
var express = require('express');

//Creating express instance
var app = express();

app.use('/',(req,res,next)=>{
  res.send("Hi ! We have started");
})

app.listen(3000);
console.log("Server started listening at 3000 port");



module.exports = app;
