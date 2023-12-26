

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');




const secretKey = process.env.USER_JWT_KEY;
// authernticate

const authUser = (request, response, next) => {
  const token = request.headers.authorization?.split(' ')[1];

  try{
    const decodedToken = jwt.verify(token, 'secretKey');
    const userRoles = decodedToken.role || [];

    const requiredRoles = ['admin'];

    if (userRoles.some(role => requiredRoles.includes(role))){
      next();
    } else {
      response.status(403).json({ error: 'Access Forbidden'});
    }
  } catch (error){
    response.status(401).json({error: 'Unauthorized'});
  }
};

//  verift jwt token
const verifyToken = (request, response, next) => {
  const token = request.header('Authorization');

  if (!token){
    return response.status(401).json({message: 'Access Denied, token missing'});
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    request.user = decoded;

    if (request.user.role !== 'admin'){
      return response.status(403).json({message:'Access Denied, Must Be An Admin!'})
    }
    next();
  } 
  catch (error) {
    response.status(400).json({message: 'Invalid Token'});
  }
};



module.exports={

 verifyToken,
 authUser
}