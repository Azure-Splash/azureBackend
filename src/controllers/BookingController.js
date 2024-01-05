const express = require('express');
const { Booking } = require('../models/BookingModel');
const { authUser, addId } = require('../middleware/admin_auth');
const router = express.Router();
require('dotenv').config();


// get all booking by id
// Admin and workers only
router.get("/admin/all", authUser, async (request, response) => {
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
	// find all bookings
	let result = await Booking.find({}).populate('user pool', '-password -numberOfLanes');

		response.json({message: 'List of all bookings' , booking: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

// find booking by date
// Admin and workers only
router.get('/admin/:date', authUser, async(request, response) => {
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
	let result = await Booking.find({date: request.params.date}).populate('user pool', '-password').catch(error => error);

	response.json({message: 'Bookings for selected date' , booking: result});
} else{
	response.status(403).json({error: 'Access Forbidden'})
}
});

// find one booking by id
// Admin and workers
router.get("/admin/one/:id",authUser, async (request, response) => {
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
		let result = await Booking.findOne({_id: request.params.id}).populate('user pool', '-password');
		
		response.json({mewssage: 'Bookings by selected ID', booking: result})
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

// get bookings by user id
// Admin and workers
router.get("/admin/user/:userId",authUser, async (request, response) =>{
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
    let result = await Booking.find({ user: request.params.userId }).populate('user pool', '-password');

    response.json({message: 'All Boookings with Selected User',booking: result});
} else{
	response.status(403).json({error: 'Access Forbidden'})
}
});

// get bookings by pool
//  Admin and workers
router.get("/admin/pool/:poolId", authUser,async (request, response) => {
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
    let result = await Booking.find({pool: request.params.poolId}).populate('user pool', '-password -numberOfLanes');
    response.json({message:'All Bookings for selected pool',booking: result });
} else{
	response.status(403).json({error: 'Access Forbidden'})
}
});

  // Admin to create a booking by entering user id
  // Admin and workers
  router.post('/admin/new-booking',  authUser, async (request, response) => {
	
	const { user, pool, time, date, lane } = request.body;
  
	try {
		const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role))
	  // Check if the required fields are provided
	  if (!user || !pool || !time || !date || !lane) {
		return response.status(400).json({ message: "Missing required fields" });
	  }
  
	  // Use createBooking function to create a new booking
	  const newBooking = await adminCreateBooking(user, pool, time, date, lane, request);
  
	  response.status(201).json(newBooking);
	} catch (error) {
	  response.status(500).json({ message: error.message });
	}
  });
  
  // Function to create a booking
  const adminCreateBooking = async (user, pool, time, date, lane, request) => {
	try {
	  // Check if the user is authenticated
	  if (!request.user) {
		throw new Error('User not authenticated');
	  } 
  
	// Create a new booking using the Booking model
	  const newBooking = await Booking.create({
		user,
		pool,
		time,
		date,
		lane,
	  });

	  await newBooking.populate('user pool', 'firstName email poolName')
  

	  return {
		booking: newBooking,
		userName: user.firstName, // Include the user's name in the response
	  };
	} catch (error) {
	  throw new Error('Failed to create booking: ' + error.message);
	}
  };

// update a users booking details, search by user ID
// admin and workers only
router.patch("/admin/update/:id", authUser,async (request, response) => {
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
	let result = await Booking.findByIdAndUpdate(
		request.params.id, 
		request.body,
		{
			returnDocument:"after",
	
		}
		).catch(error => error);
		response.json({booking: result});
	}else{
		response.status(403).json({error: 'Access Forbidden'})	
	}

});


// admin to delete any booking
router.delete('/admin/delete/:id', authUser, async(request, response)=>{
	const allowedRoles =['admin', 'worker'];

	if (allowedRoles.includes(request.user.role)){
		let result = await Booking.findByIdAndDelete(request.params.id).catch(error => error);
		response.json({deletedBooking: result});
	} else{
		response.status(403).json({error: 'Access Forbidden'})
	}
});

///////////////////////////////////////////

// create a booking
// user must have an account and be signed in
router.post('/new',  addId, async (request, response) => {
	const { pool, time, date, lane } = request.body;
  
	try {
	  // Check if the required fields are provided
	  if (!pool || !time || !date || !lane) {
		return response.status(400).json({ message: "Missing required fields" });
	  }
  
	  // Use createBooking function to create a new booking
	  const newBooking = await createBooking(pool, time, date, lane, request);
  
	  response.status(201).json(newBooking);
	} catch (error) {
	  response.status(500).json({ message: error.message });
	}
  });
  
  // Function to create a booking
  const createBooking = async (pool, time, date, lane, request) => {
	try {
	  // Check if the user is authenticated
	  if (!request.user) {
		throw new Error('User not authenticated');
	  }
  
	// Create a new booking using the Booking model
	  const newBooking = await Booking.create({
		user: request.user._id, // Include the user field
		pool,
		time,
		date,
		lane,
	  });
  
	  return newBooking;
	} catch (error) {
	  throw new Error('Failed to create booking: ' + error.message);
	}
  };


// user to edit own booking

router.patch('/update/:id', authUser, async (request, response) => {
	const userId = req.user._id;
	const bookingId = req.params.id;
	const updates = req.body;
  
	try {
	  // Ensure that the booking exists and is associated with the user
	  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  
	  if (!booking) {
		return request.status(404).json({ message: 'Booking not found' });
	  }
  
	  // Update the booking fields
	  Object.keys(updates).forEach((key) => {
		booking[key] = updates[key];
	  });
  
	  // Save the updated booking
	  await booking.save();
  
	  response.json({ message: 'Booking updated successfully', booking });
	} catch (error) {
	  console.error(error);
	  response.status(500).json({ message: 'An error occurred while updating the booking' });
	}
  }); 

// user to view all their bookings
// must be logged in

router.get("/list-all", authUser, async (request, response) =>{
	const userId = request.user._id;

	try {
	  // Fetch all bookings associated with the user
	  const bookings = await Booking.find({ user: userId });
  
	  if (bookings.length === 0) {
		return response.json({ message: 'You currently have no bookings' });
	  }
  
	  response.json({ bookings });
	} catch (error) {
	  console.error(error);
	  response.status(500).json({ message: 'An error occurred while fetching bookings' });
	}
  });


//user to delete own booking 
router.delete("/delete/:id", authUser,async (request, response) => {
	const userId = request.user._id;
	const bookingId = request.params.id;

  try {
    // Ensure that the booking exists and is associated with the user
    const booking = await Booking.findOne({ _id: bookingId, user: userId });

	// throw error if booking id and user id dont match
    if (!booking) {
      return response.status(404).json({ message: 'Booking not found' });
    }
	// colledted the bookingID
	const deletedBookingId = booking._id;

   
    await booking.deleteOne();

	response.json({ message: 'Booking deleted successfully', deletedBookingId });
	

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred while deleting the booking' });
  }
});



module.exports = router;





