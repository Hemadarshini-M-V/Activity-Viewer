//Importing file system module
var fs = require('fs');

var errorHandler = function(err,req,res,next){
    if(err){
        fs.appendFile("errorLogger.txt",err.stack+"\n",function(err){
            if(err)
                console.log("Error in file writing");
        })

        //Setting the status code for the response
        res.status(200);

        //Sending response in json
        res.send({"message":err.message});
        next();
    }
}

module.exports = errorHandler;