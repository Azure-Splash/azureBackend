const express = require('express');
const { Booking } = require('../models/BookingModel');
const router = express.Router();

router.get("/admin/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Booking.find({});

	response.json({
		booking: result
	});

});

// find one booking by id
router.get("/admin/one/:id", async (request, response) => {
	let result = await Booking.findOne({_id: request.params.id}).populate('user pool', '-password').catch(error => error);

	response.json({
		booking: result
	});
});

// find booking by user id
router.get("/admin/user/:id", async (request, response) =>{
    let result = await Booking.find({user: request.params.user.id}).populate('user pool', '-password').catch(error => error);

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