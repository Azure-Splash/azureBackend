
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');


// authernticate

const authUser = async (request, response, next) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token){
    return response.status(401). json({error: 'Must be a logged in as an  Admin'})
   }

  try{
    const decodedToken = jwt.verify(token, process.env.USER_JWT_KEY);
   const user = await User.findById(decodedToken.id)

   if(!user){
    return response.status(401).json({ error: 'Unauthorised'})
   }

   request.user = user;
   next()
  }catch (error){
    return response(401).json({error:'Unauthorised'})
  }
};


//  verift jwt token
// const verifyToken = (request, response, next) => {
//   // const secretKey = process.env.USER_JWT_KEY;
//   const token = request.header('Authorization');

//   if (!token){
//     return response.status(401).json({message: 'Access Denied, token missing'});
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.USER_JWT_KEY);
//     request.user = decoded;

//     if (request.user.role !== 'admin'){
//       return response.status(403).json({message:'Access Denied, Must Be An Admin!'})
//     }
//     next();
//   } 
//   catch (error) {
//     response.status(400).json({message: 'Invalid Token'});
//   }
// };



module.exports={

 authUser
}