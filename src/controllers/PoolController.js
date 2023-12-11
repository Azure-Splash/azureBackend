const express = require('express');
const { Pool } = require('../models/PoolModel');
const router = express.Router();

router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Pool.find({});

	response.json({
		staff: result
	});

});

// find one worker by id
router.get("/one/:id", async (request, response) => {
	let result = await Pool.findOne({_id: request.params.id});

	response.json({
		staff: result
	});
});