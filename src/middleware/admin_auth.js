

const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust the path based on your project structure

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
  let objDecodedAuth = {email: '', password: ''};
  objDecodedAuth.email = decodedAuth.substring(0, decodedAuth.indexOf(":"));
  objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);

  // Attach the object to the request
  request.userAuthDetails = objDecodedAuth;

  next();
}

const isAdmin = async (request, response, next) => {
  try {

      if (request.user.role === "admin") {
          next();
      } else {
          response.status(403);
          throw new Error("You are not authorised to access this route");
      }
  } catch (error) {
      next(error);
  }
};

// Process the JWT on the request headers 
const validJWT = (request, response, next) => {
  let suppliedToken = request.headers.jwt;
  console.log(suppliedToken);

  // jwt.verify(token, secret, callback function);
  jwt.verify(suppliedToken, process.env.USER_JWT_KEY, (error, decodedJWT) => {
      if (error) {
          console.log(error);
    // This will be caught by error-handling middleware.
          throw new Error("User not authenticated.");
      }

  // Attach the decoded JWT to the request as an object.
      request.decodedJWT = decodedJWT;
  });

  next();
}

// Error-handling middleware
// For simplicity's sake in this challenge,
// we're assuming the only error we'll ever get is
// that the user's auth data is invalid.
const catchErrors = (error, request, response, next) => {
console.log("Error obj:" + error)
if (error){
  response.status(403).json({
    error: error.message
  })
}
}

module.exports={

  isAdmin,
  // catchErrors, 
  //  validateBasicAuth, 
  validJWT
}