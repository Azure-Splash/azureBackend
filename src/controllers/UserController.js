const express = require('express');
const { User } = require('../models/UserModel');
const { Worker } = require('../models/WorkersModel')
const router = express.Router();
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');

// Middleware function to authenticate the user making the request.
// Verifies the JWT from the Authorization header and attaches the user to the request object.
async function authenticate(request, response, next) {
	try {
	  const token = request.header("Authorization").replace("Bearer ", "");
	  const decoded = jwt.verify(token, process.env.JWT_SECRET);
	  const worker = await Worker.findOne({ _id: decoded._id });
	  if (!worker) {
		throw new Error();
	  }
	  req.worker = worker;
	  next();
	} catch (e) {
	  res.status(401).json({ message: "Please authenticate" });
	}
  }

router.get("/all",authenticate, async (request, response) => {
	if (!req.worker.isAdmin) {
		return res.status(403).json({ message: "Unauthorized" });
	  }
	// Empty object in .find() means get ALL documents
	let result = await User.find({});

	response.json({
		user: result
	});

});


// find one user by id
// workers only
router.get("/one/:id", async (request, response) => {

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