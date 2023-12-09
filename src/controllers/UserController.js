const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();

router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await User.find({});

	response.json({
		user: result
	});

});

// find one user by id
// router.get("/one/:id", async (request, response) => {
// 	let result = await User.findOne({_id: request.params.id});

// 	response.json({
// 		user: result
// 	});
// });

// find user by last name
router.get("/name/:lastName", async (request, response) => {
	let result = await User.findOne({lastName: request.params.lastName});

	response.json({
		user: result
	});
});



// create new user
router.post("/", async (request, response) => {
	let newUser = await User.create(request.body).catch(error => error);

	response.json(newUser);
})

// update user
// does not overwrite or remove any unmentioned properties
router.patch("/:id", async (request, response) => {
	let result = null;

	response.json({
		user: result
	});

});

// delete user by id
router.delete("/:id", async (request, response) => {
	let result = null;

	response.json({
		user: result
	});

});

module.exports = router;