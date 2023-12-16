const validateBasicAuth = (request, response, next) => { 

  // Assign the header to something easier to work with, if it exists.
  let authHeader = request.headers["authorization"] ?? null;

  // If no auth header provided, stop the request.
  if (authHeader == null) {
      throw new Error("No auth data detected on a request to a protected route!");
  }

  // Confirm it's a Basic auth string, 
  // and store only the encoded string.
  if (authHeader.startsWith("Basic ")) {
      authHeader = authHeader.substring(5).trim();
  }

  // Decode the string.
  let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');

  // Convert it into a usable object.
  let objDecodedAuth = {username: '', password: ''};
  objDecodedAuth.username = decodedAuth.substring(0, decodedAuth.indexOf(":"));
  objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);

  // Attach the object to the request
  request.userAuthDetails = objDecodedAuth;

  // Call the next step in the server's middleware chain or go to the route's callback.
  next();
}

module.export={ validateBasicAuth }