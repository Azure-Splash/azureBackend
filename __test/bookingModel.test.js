const mongoose = require("mongoose");
const { Booking } = require("../src/models/BookingModel");
const jwt = require('jsonwebtoken');
const request = require('supertest');
require('dotenv').config();

//" beforeAll" runs before all tests and is used to handle setup
beforeAll(async () => {
  // Set up a new MongoDB connection
  const url = process.env.DB_URI
  
});


describe("Booking Model Test", () => {
  // Define a sample booking data object based on the Booking schema
  const bookingData = {
    user: new mongoose.Types.ObjectId("658437dac379b740a7b95005"),
    pool: new mongoose.Types.ObjectId("658437dac379b740a7b95001"),
    lane: 1,
    date: new Date(2023, 10, 1) ,
    time: "2pm",
    

  };
  // Create a new Booking instance with the sample data
  const booking = new Booking(bookingData);

//   each "test" represents a single test case
//   These test checks if the booking object has the correct property with the correct value
  test("new booking has a user", () => {
    expect(booking).toHaveProperty("user", bookingData.user);
  });

  test("new booking has a pool", () => {
    expect(booking).toHaveProperty("pool", bookingData.pool);
  });

  test("new booking has a lane", () => {
    expect(booking).toHaveProperty("lane", bookingData.lane);
  });

  test("new booking has a date", () => {
    expect(booking).toHaveProperty("date", bookingData.date);
  });

  test("new booking has a time", () => {
    expect(booking).toHaveProperty("time", bookingData.time);
  });

});