// HTTP status codes that will be used on responses

module.exports = {

	// Success 2xx
	HTTP_OK : 200, // Everything is Ok.
	HTTP_CREATED : 201, // Post was done succesfully and the object was created on database.

	// Client Error 4xx
	HTTP_BAD_REQUEST : 400, // Request mal formed, missing parameters or information. Used for API client error
	HTTP_NOT_FOUND : 404, // The page or service does not exist
	HTTP_METHOD_NOT_ALLOWED : 405, // It happens on an attempt to access another HTTP method (POST, GET, PUT, …) instead of the expected for the address.
	HTTP_CONFLICT : 409, // The object already exits or because of some business logic it can be inserted on database or it will cause a conflict
	HTTP_UNSUPPORTED_MEDIA_TYPE : 415, // The image on request was not provided on a supported format.
	HTTP_UNPROCESSABLE_ENTITY : 422, // Used for validation errors - The server understands the content type of the request entity but was unable to process the instruction.

	// Server Error 5xx
	HTTP_INTERNAL_ERROR : 500, // Something is wrong inside the server. Ex.: Database is off, unexpeted error.

}