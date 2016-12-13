'use strict';

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var error = require('./middlewares/error');
var httpStatusCode = require('./utils/httpStatusCode');
var message = require('./utils/messages');
var busboy = require('connect-busboy');
var app = express();

// default options, and immediate parsing
app.use(busboy({ immediate: true }));
app.disable('x-powered-by');

//  Request body parsing middleware supporting JSON and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


if ('production' == app.get('env')){
	// handling 404 errors
	app.use(function(err, req, res, next) {
		if(err.status !== httpStatusCode.HTTP_NOT_FOUND) {
			return next();
		}
		console.log(err.message);
		res.send(messages.NOT_FOUND_404).status(httpStatusCode.HTTP_NOT_FOUND);
	});
}

if ('development' == app.get('env')) {
	// show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
}

load('controllers')
	.then('routes')
	.into(app);

app.use(error.notFound);
app.use(error.serverError);
var PORT = process.env.PORT || 8080;
// start express server
app.listen(PORT, function() {
    console.log('Express server listening on port %d in %s mode', PORT, 'development');
});