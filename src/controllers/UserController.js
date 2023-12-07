const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();

router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await User.find({});

	response.json({
		users: result
	});

});