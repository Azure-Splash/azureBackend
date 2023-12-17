const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');
const { isAdmin } = require('../middleware/admin_auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
	new LocalStrategy(async (email, password, done) => {
	  try {
		const user = await user.findOne({ email });
		if (!user) {
		  return done(null, false, { message: 'Incorrect email.' });
		}
		const isValidPassword = await user.isValidPassword(password);
		if (!isValidPassword) {
		  return done(null, false, { message: 'Incorrect password.' });
		}
		const role = await role.findOne({ name: user.role });
		if (!role) {
		  return done(null, false, { message: 'Invalid role.' });
		}
		return done(null, user, { role: role });
	  } catch (err) {
		return done(err);
	  }
	})
  );

// get all users
router.get("/all", async (request, response) => {

	let result = await User.find({}).populate('role', 'name');


	response.json({
		user: result
	});
});

// router.get("/all", passport.authenticate('jwt', { session: false }), isAdmin, async (request, response) => {
// 		let result = await User.find({}).populate('role', 'name');


// 	response.json({
// 		user: result
// 	});
//   });


// find one user by id
router.get("/one/:id", async (request, response) => {
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