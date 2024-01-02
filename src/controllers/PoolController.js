const express = require('express');
const { Pool } = require('../models/PoolModel');
const router = express.Router();


// list all pools
// admin only
router.get("/pools/all", async (request, response) => {
	
	let result = await Pool.find({});

	response.json({
		pool: result
	});

});

// find one pool by id
//admin only
router.get("admin//one/:id", async (request, response) => {
	let result = await Pool.findOne({_id: request.params.id});

	response.json({
		pool: result
	});
});

// edit pool by id
router.patch("/:id", async (request, response) => {
	let result = await Pool.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);

	response.json({
		pool: result
	});

});


// delete pool by id
router.delete("/:id", async (request, response) => {
	let result = await Pool.findByIdAndDelete(request.params.id).catch(error => error);

	response.json({
		deletedPool: result
	});

});

module.exports = router;