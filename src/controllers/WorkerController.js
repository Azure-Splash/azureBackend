const express = require('express');
const { Worker } = require('../models/WorkersModel');
const { comparePassword, generateJwt } = require('../functions/workerAuthFunctions');
const router = express.Router();


router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Worker.find({}); 

	response.json({
		staff: result
	});

});

// find one worker by id
router.get("/one/:id", async (request, response) => {
	let result = await Worker.findOne({_id: request.params.id});

	response.json({
		staff: result
	});
});

// find worker by last name
router.get("/name/:lastName", async (request, response) => {
	let result = await Worker.find({lastName: request.params.lastName});

	response.json({
		staff: result
	});
});



// create new worker
router.post("/", async (request, response) => {
	let newWorker = await Worker.create(request.body).catch(error => error);

    response.json(newWorker);
});


// POST to /staff/admin/login
router.post("/admin/login", async (request, response) => {
	// Find worker by provided email
	let targetWorker = await Worker.findOne({email: request.body.email}).catch(error => error);

	// Check if the  provided is  correct password
	let isPasswordCorrect = await comparePassword(request.body.password, targetWorker.password);

	if (!isPasswordCorrect){
		response.status(403).json({error:"You are not authorised to do this!"});
	}
	let freshJwt = generateJwt(targetWorker._id.toString());

	// respond with the JWT 
	response.json({
		jwt: freshJwt  
	});

});

// update worker
// does not overwrite or remove any unmentioned properties
router.patch("/:id", async (request, response) => {
	let result = await Worker.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);

	response.json({
		staff: result
	});

});


// delete user by id
router.delete("/:id", async (request, response) => {
	let result = await Worker.findByIdAndDelete(request.params.id).catch(error => error);

	response.json({
		deletedStaff: result
	});

});





module.exports = router;