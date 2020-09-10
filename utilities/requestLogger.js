//Importing file system module
var fs = require('fs');

var requestLogger = function(req,res,next){
    var logString = "Request received from "+req.url+
        " at "+ new Date() +"\n";
    fs.appendFile("requestLog.txt",logString,function(err){
        if(err){
            next(err);  // Pass error object to error handler
        }
    })
    next();  //Pass control to next configured route handler
}

module.exports = requestLogger;
