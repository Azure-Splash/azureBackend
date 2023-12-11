const express = require('express');
const { Booking } = require('../models/BookingModel');
const router = express.Router();


// get all booking by id
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

// get bookings by user id
router.get("/admin/user/:id", async (request, response) =>{
    let result = await Booking.find({ user: _id }).populate('user').populate('pool');

    response.json({
		booking: result
	});
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




// // Controller function to get bookings by user
// const getBookingsByUser = async (req, res) => {
//   const userId = req.params.userId; // Assuming the user ID is passed as a parameter

//   try {
//     const bookings = await Booking.find({ user: userId }).populate('user').populate('pool').catch(error => error);
//     res.json(bookings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { getBookingsByUser };
