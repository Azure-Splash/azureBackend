const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { authUser } = require('../middleware/admin_auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();



// get all users
// Admin and workers only
router.get('/all', authUser,  async (request, response) => {
	if (request.user.role === 'admin'|| 'worker'){
		let result = await User.find({}).populate('role', 'name').sort({ createdAt: -1 });
			response.json({user: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});


// find one user by id
// Admin and workers only
router.get("/one/:id", authUser, async (request, response) => {
	if (request.user.role === 'admin' || 'worker'){
		let result = await User.findOne({_id: request.params.id});
		response.json({user: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

// find user by last name
// Admin and workers only
router.get("/name/:lastName", async (request, response) => {
	if (request.user.role === 'admin'|| 'worker'){
		let result = await User.find({lastName: request.params.lastName});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
	});

// update user
// does not overwrite or remove any unmentioned properties
// Admin and workers only
router.patch("/:id",authUser, async (request, response) => {
	if (request.user.role === 'admin' || 'worker'){
	let result = await User.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);

	response.json({user: result});

} else{
	response.status(403).json({error: 'Access Forbidden'})
}
});


// delete user by id. 
// Admin only
router.delete("/delete/:id",authUser, async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await User.findByIdAndDelete(request.params.id).catch(error => error);
		response.json({deletedUser: result});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

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