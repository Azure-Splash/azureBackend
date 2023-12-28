const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const { authUser } = require('../middleware/admin_auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();



// get all users
// Admin and workers only
router.get('/users/all', authUser,  async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await User.find({}).populate('role', 'name').sort({ createdAt: -1 });
			response.json({user: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});


// find one user by id
// Admin and workers only
router.get("/user/one/:id", authUser, async (request, response) => {
	if (request.user.role === 'admin' || 'worker'){
		let result = await User.findOne({_id: request.params.id});
		response.json({user: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

// find user by last name
// Admin and workers only
router.get("/name/:lastName", authUser, async (request, response) => {

	if (request.user.role === 'admin'|| 'worker'){
		let result = await User.find({lastName: request.params.lastName});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
	});

// update user
// does not overwrite or remove any unmentioned properties
// Admin and workers only
router.patch("/user/update/:id",authUser, async (request, response) => {
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
router.delete("/user/delete/:id",authUser, async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await User.findByIdAndDelete(request.params.id).catch(error => error);
		response.json({deletedUser: result});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

module.exports = router;