const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');
// const { validJWT, catchErrors}= require('../middleware/admin_auth')

// get all users
// router.get('/all',  async (request, response) => {
		// let decodedJWT = request.decodedJWT;
	
		// // Assign locally for cleaner code - but not needed.
		// let decryptedEmail = decryptString(decodedJWT.email);
		// let decryptedPassword = decryptString(decodedJWT.password);
	
		// // To prove we got the data we're expecting:
		// console.log("Decrypted user data is: \n\t" + decryptedEmail + "\n\t" + decryptedPassword);
	
		// // Encrypt the data again to make sure nothing unsecure is put into the new, fresh JWT
		// let encryptedEmail = encryptString(decryptedEmail);
		// let encryptedPassword = encryptString(decryptedPassword);
	
		// let objectToTokenize = {
		// 	email: encryptedEmail, 
		// 	password: encryptedPassword
		// }
	

		// // Passing in an object instead of doing:
		// // generateJWT({someKey:"someValue"})
		// // to make that above if condition easier to write
		// let userJwt = generateJWT(objectToTokenize);
	
		// // The response can assume the golden happy path,
		// // since error-handling middleware would send its own response
		// // if an error were detected.
		// let responseData = {
		// 	message: "You are a valid user!",
		// 	newJWT: userJwt
		// }
	// 	let result = await User.find({}).populate('role', 'name');
	// 	response.json(responseData);
	// response.json({
	// 	user: result
	// });
	// });

  
  // GET all users.
  router.get('/all',  async (request, response) => {
	let result = await User.find({}).populate('role', 'name');
	response.json({
		user: result
	});

});

// find one user by id
router.get("/one/:id",  async (request, response) => {
	let result = await User.findOne({_id: request.params.id});
	// response.json({ message: 'This route is accessible only by admins.' });
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
		response.status(403).json({error:"Invalid Details, Try Again!"});
	}

	// If they provided the correct, generate a JWT
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