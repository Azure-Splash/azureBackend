const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { authUser} = require('../middleware/admin_auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();


// create new user
router.post("/register", async (request, response) => {
	let newUser = await User.create(request.body).catch(error => error);

	response.status(201).json({message: 'User registered successfully!'});

    response.json({user: newUser});
});


// POST to /users/login
router.post("/login", async (request, response) => {

	// Find user by provided email 
	const { email, password } = request.body;

	try{
		const user = await User.findOne({ email });
		
		if (!user){
			return response.status(401).json({message: 'Invalid Email or Password!'})
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch){
			return response.status(401).json({message: 'Invalid Email or Password!'})
		}

		const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.USER_JWT_KEY, { expiresIn: '3h'});

		response.json({token});
	}
	catch (error) {
		response.status(500).json({error: error.message});
	}
});


// user to view their own details
router.get('/details', authUser,  async (request, response) => {
	response.json({ user: request.user})
	if (request.user.role === 'user'){
		let result = await User.findOne({user: body.user});
			response.json({user: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});


//user to update own details
router.patch("/update",authUser, async (request, response) => {
	try {
		const update = { ...request.body };
	
		// Prevent role updates
		if (update.role) {
		  return response.status(400).json({
			message: "Role updates are not allowed through this route.",
		  });
		}
	
		let user = await User.findByIdAndUpdate(request.user._id, update, {new: true,}).select("-role");
	
		if (!user) {
		  return response.status(404).json({ message: "User not found" });
		}
	
		response.json(user);
	  } catch (error) {console.error(error);
		return response.status(500).json({ message: "An error occurred during the update" });
	  }
	});

// user to delete own account
router.delete("/delete", authUser, async (request, response) => {
	try {
	  const user = await User.findByIdAndDelete(request.user._id);
  
	  // Check if the user was deleted successfully
	  if (!user) {
		return response.status(400).json({ message: "User not found or could not be deleted" });
	  }
  
	  response.json({ message: "Account deleted successfully" });
	} catch (error) {
		console.error(error);
	  	response.status(500).json({ message: "An error occurred while trying to delete the user" });
	}
  });
  




module.exports = router;