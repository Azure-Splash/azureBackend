
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');


// authernticate

const authUser = async (request, response, next) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token){
    return response.status(401). json({error: 'Must be a logged and have the right access permissions'})
   }

  try{
    const decodedToken = jwt.verify(token, process.env.USER_JWT_KEY);
   const user = await User.findById(decodedToken.id)

   if(!user){
    return response.status(401).json({ error: 'Unauthorised'})
   }

   request.user = user;
   next()
  } catch (error) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}


// Middleware to add user ID to request
async function addId(req, res, next) {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(401).json({ message: "Missing authorization header" });
    }

    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.USER_JWT_KEY);

    console.log('Decoded Token:', decoded);

    // Corrected query to use 'id' field
    const user = await User.findOne({ _id: decoded.id });

    console.log('Found User:', user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error('Authentication Error:', e);
    return res.status(401).json({ message: "Error authenticating: " + e.message });
  }
}





module.exports={

  addId,
 authUser
}