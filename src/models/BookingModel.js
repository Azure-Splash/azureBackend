const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
   pool: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Pool", 
      required: true
    },
   lane:{
      type: Number,
      required: true,
      unquie: false,
      min: 1,
      max: 6
   },
   date: {
      type: Date,
      required: true,
      unquie: true
      
   },
   time:{
      type: String,
      required: true

   }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports={
   Booking
}