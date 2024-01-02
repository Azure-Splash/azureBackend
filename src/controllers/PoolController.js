const express = require('express');
const { Pool } = require('../models/PoolModel');
const { authUser } = require('../middleware/admin_auth');
const router = express.Router();


// list all pools
// admin only
router.get("/admin/all", authUser, async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await Pool.find({});

		response.json({message: 'List of All Pools', pool: result});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

// find one pool by id
// admin only
router.get("admin/one/:id", authUser, async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await Pool.findOne({_id: request.params.id});

		response.json({pool: result});

	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

//create a new pool
// admin only
router.post("/admin/new", authUser, async (request, response) =>{
	if(request.user.role === 'admin'){
	
		let newPool = await Pool.create(request.body).catch(error => error);

		response.status(201).json({message: 'Pool created successfully!', pool: newPool});
	
	}
});


// edit pool by id
// admin only
router.patch("/admin/update/:id", authUser, async (request, response) => {
	if (request.user.role === 'admin'){

		
	let result = await Pool.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after", 
	
		}
		);
		
		response.json({pool: result});

	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});


// delete pool by id
// admin only
router.delete("/admin/delete/:id", authUser, async (request, response) => {
	if (request.user.role === 'admin'){
		let result = await Pool.findByIdAndDelete(request.params.id)
	try {
	  if (!result) {
		return response.status(400).json({ message: "Pool not found or could not be deleted" });
	  }
  
	  response.json({ message: "Pool deleted successfully" });
	} catch (error) {
		console.error(error);
	  	response.status(500).json({ message: "An error occurred while trying to delete the pool" });
	}
}
  });

module.exports = router;