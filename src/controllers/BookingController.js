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
	let result = await Booking.findOne({_id: request.params.id}).populate('user pool', '-password');

	response.json({
		booking: result
	});
});


// delete booking by id
router.delete("/:id", async (request, response) => {
	let result = await Booking.findByIdAndDelete(request.params.id).catch(error => error);

	response.json({
		deletedBooking: result
	});

});


module.exports = router;