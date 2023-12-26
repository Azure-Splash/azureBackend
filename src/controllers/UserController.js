const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');
const { verifyToken, isAdmin, authUser } = require('../middleware/admin_auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



// get all users
router.get('/all', verifyToken,  async (request, response) => {


	try{

	let result = await User.find({ _id: request.user.id}).populate('role', 'name').sort({ createdAt: -1 });

	if (!result){
		return response.status(404).json({message: 'No data found'});
	}

	response.json({
		user: result
	})
}
catch (error) {
	response.status(500).json({error: error.message});
}

});

// find one user by id
router.get("/one/:id",  async (request, response) => {
	let result = await User.findOne({_id: request.params.id});
	response.json({
		user: result
	});
});

// find user by last name
router.get("/name/:lastName", async (request, response) => {
	let result = await User.find({lastName: request.params.lastName});

	response.json({
		user: result
	});
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

	// let targetUser = await User.findOne({email: request.body.email}).catch(error => error);

	// if (!targetUser){
	// 	return response.status(401).json ({message: 'Invalid Email or Password!'})
	// }

	// // Check if user provided the correct password
	// let isPasswordCorrect = await comparePassword(request.body.password, targetUser.password);

	// if (!isPasswordCorrect){
	// 	response.status(401).json({error:"Invalid Email or Password!"});
	// }

	// // If they provided the correct, generate a JWT
	// let freshJwt = generateJwt(targetUser._id.toString());

	// respond with the JWT 
// 	response.json({
// 		jwt: freshJwt
// 	});

// });



// update user
// does not overwrite or remove any unmentioned properties
router.patch("/:id", async (request, response) => {
	let result = await User.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);

	response.json({
		user: result
	});

});


// delete user by id
router.delete("/:id", async (request, response) => {
	let result = await User.findByIdAndDelete(request.params.id).catch(error => error);
    
	response.json({
		deletedUser: result
	});

});

module.exports = router;