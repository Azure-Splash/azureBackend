const express = require('express');
const { Booking } = require('../models/BookingModel');
const router = express.Router();

router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Booking.find({});

	response.json({
		booking: result
	});

});

// find one booking by id
router.get("/one/:id", async (request, response) => {
	let result = await Booking.findOne({_id: request.params.id});

	response.json({
		booking: result
	});
});


module.exports = router;