'use strict';

var message = require('../utils/messages');
var httpStatusCode = require('../utils/httpStatusCode');

exports.notFound = function(req, res, next) {
  res.status(httpStatusCode.HTTP_NOT_FOUND);
  res.send(message.NOT_FOUND_404);
};

exports.serverError = function(error, req, res, next) {
  res.status(httpStatusCode.HTTP_INTERNAL_ERROR);
  res.send(message.SOMETHING_WRONG_HAPPENED);
};