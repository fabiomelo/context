var httpStatusCode = require('./httpStatusCode');

jsonMessageError = function(id, msg) {
	return '{ "id": "' + id + '", "description": "' + msg + '"}';
}

module.exports = {

	//Generic
	SOMETHING_WRONG_HAPPENED: 'Something wrong happened on your request.',
	FAIL_TO_REDIRECT: 'Fail to redirect.',
	NOT_FOUND_404: '404 - Not found!',
	COULD_NOT_CONNECT_DATABASE: 'Could not connect database!',

	// JSON error messages
	JSON_UNSUPPORTED_MEDIA_TYPE: jsonMessageError('UNSUPPORTED MEDIA TYPE',
		'The request entity has a media type which the server or resource does not support.'),

	JSON_INTERNAL_ERROR: jsonMessageError('INTERNAL ERROR',
		'Something is wrong inside the server.'),

	JSON_ID_NOT_FOUND: jsonMessageError('NOT FOUND',
		'It was not possible to find any image with the provided id.'),

	JSON_BAD_REQUEST: jsonMessageError('BAD REQUEST',
	  'Some parameter was not provided or provided on a general wrong format.'),

	JSON_UNSUPPORTED_MEDIA: jsonMessageError('UNSUPPORTED MEDIA TYPE',
		'The image on request was not provided on a supported format.'),

	JSON_METHOD_NOT_ALLOWED: jsonMessageError('METHOD NOT ALLOWED',
		'Try access another HTTP method (POST, GET, PUT, …) instead of the expected for the address.'),

	jsonMessageSuccessful : function(response, text) {
		response.status(httpStatusCode.HTTP_OK);
		response.set('content-type', 'application/json');

		var json = '{ "message": "' + text + '"}';

		response.send(json);
	},

	jsonMessageConflict : function(response) {
		response.status(httpStatusCode.HTTP_CONFLICT);
		response.set('content-type', 'application/json');

		var json = '{ "message": "The device is already registered!"}';

		response.send(json);
	},

	jsonMessageInternalError : function(response, err) {
		response.status(httpStatusCode.HTTP_INTERNAL_ERROR);
		response.set('content-type', 'application/json');
		response.send(err);
	},

	
	jsonMessageBadRequest : function(response) {
		response.status(httpStatusCode.HTTP_BAD_REQUEST);
		response.set('content-type', 'application/json');
		response.send(this.JSON_BAD_REQUEST);
	},

	jsonMessageUnsupportedMedia : function(response) {
		response.status(httpStatusCode.HTTP_UNSUPPORTED_MEDIA_TYPE);
		response.set('content-type', 'application/json');
		response.send(this.JSON_UNSUPPORTED_MEDIA);
	},

	jsonMessageMethodNotAllowed : function(response){
		response.status(httpStatusCode.HTTP_METHOD_NOT_ALLOWED);
		response.set('content-type', 'application/json');
		response.send(this.JSON_METHOD_NOT_ALLOWED);
	}
}