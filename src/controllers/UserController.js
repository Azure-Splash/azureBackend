const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');

router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await User.find({});

	response.json({
		user: result
	});

});



// find one user by id
// workers only
router.get("/one/:id",authenticate, async (request, response) => {
	if (!req.worker.isAdmin) {
		return res.status(403).json({ message: "Unauthorized" });
	  }
	let result = await User.findOne({_id: request.params.id}).populate('-password');

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
router.post("/", async (request, response) => {
	let newUser = await User.create(request.body).catch(error => error);

    response.json({
		user: newUser
	});
});


// POST to /users/login
router.post("/login", async (request, response) => {
	// Find user by provided email
	let targetUser = await User.findOne({email: request.body.email}).catch(error => error);

	// Check if user provided the correct password
	let isPasswordCorrect = await comparePassword(request.body.password, targetUser.password);

	if (!isPasswordCorrect){
		response.status(403).json({error:"You are not authorised to do this!"});
	}
	let freshJwt = generateJwt(targetUser._id.toString());

	// respond with the JWT 
	response.json({
		jwt: freshJwt
	});

});

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