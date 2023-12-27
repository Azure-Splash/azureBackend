const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { authUser } = require('../middleware/admin_auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();


// response.json({ user: request.user})

// create new user
router.post("/register", async (request, response) => {
	let newUser = await User.create(request.body).catch(error => error);

	response.status(201).json({message: 'User registered successfully!'});

    response.json({
		user: newUser
	});
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



module.exports = router;