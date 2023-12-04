const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const BookingSchema = new Schema({


});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports={
   Booking
}