const express = require('express');
const { Booking } = require('../models/BookingModel');
const router = express.Router();


// get all booking by id
router.get("/admin/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Booking.find({}).populate('user pool', '-password');

	response.json({
		booking: result
	});

});

// find booking by date
router.get('/admin/:date', async(request, response) => {
	let result = await Booking.find({date: request.params.date}).populate('user pool', '-password').catch(error => error);

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

// get bookings by user id
router.get("/admin/user/:userId", async (request, response) =>{
    let result = await Booking.find({ user: request.params.userId }).populate('user pool', '-password').catch(error => error);

    response.json({
		booking: result
	});
});

// get bookings by pool
router.get("/admin/pool/:poolId", async (request, response) => {
    let result = await Booking.find({pool: request.params.poolId}).populate('user pool', '-password -numberOfLanes').catch(error => error);

    response.json({
        booking: result
    });
});

// create a booking
router.post("/", async (request, response) => {
	let newBooking = await Booking.create(request.body).catch(error => error);

    response.json(newBooking);
});

// edit booking by id
router.patch("/:id", async (request, response) => {
	let result = await Booking.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);

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





