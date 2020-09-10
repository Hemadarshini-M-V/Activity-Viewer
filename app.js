//Imports
var express = require('express');
var cors = require('cors');

var router = require('./routes/router');
var requestLogger = require('./utilities/requestLogger');
var errorHandler = require('./utilities/errorHandler');

//Creating express instance
var app = express();

//Using CORS for Cross-origin resource sharing
app.use(cors());

//Using request logger to keep track of requests
app.use(requestLogger);

//Using router for all the routes
app.use(router);

//Handling errors using error handler
app.use(errorHandler);


app.listen(8081);
console.log("Server started listening at 8081 port");



module.exports = app;
