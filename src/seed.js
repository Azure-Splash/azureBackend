require('dotenv').config()

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { User } = require('./models/UserModel');
const { Worker } = require('./models/WorkersModel');
const { Pool } = require('./models/PoolModel');
const { Booking } = require('./models/BookingModel');

databaseConnect().then(async () => {

	console.log("Creating seed data!");

    // Admin user vis Worker model
    let newAdmin = await Worker.create({

        firstName: "Stacy",
        lastName: "Jones",
        email: "stacy@azure.com",
        password: "password",
        phoneNumber:"0404999222",
        age: "45",
        suburb: "Burleigh",
        isAdmin: "true"
    });

    // User Model
    
    let newUser = await User.create({

        firstName: "Jean",
        lastName: "Peters",
        email: "jean@gmail.com",
        password: "password12",
        phoneNumber:"0401438902",
        age: "26",
        suburb: "Mermaid Water",
    });

    // Worker Model

    let newWorker = await Worker.create({

        firstName: "Tom",
        lastName: "Roman",
        email: "tom@azure.com",
        password: "password",
        phoneNumber:"0402663123",
        age: "30",
        suburb: "Miami",
        isAdmin: "false"
    });

    // Pool Model

    let newIndoorPool = await Pool.create({
        poolName: "Indoor Pool",
        numberOfLanes: "6"
    });
    let newOutdoorPool = await Pool.create({
        poolName: "Outdoor Pool",
        numberOfLanes: "6"
    });


    // Booking Model

    let newBooking = await Booking.create({
        user: newUser._id,
        pool: newIndoorPool._id,
        lane: "2",
        date: "9/12/23",
        time: "3pm"
    });

    let newBooking1 = await Booking.create({
        user: newUser._id,
        pool: newOutdoorPool._id,
        lane: "6",
        date: "12/12/23",
        time: "3pm"
    });

    let newBooking2 = await Booking.create({
        user: newWorker._id,
        pool: newIndoorPool._id,
        lane: "4",
        date: "1/12/23",
        time: "1pm"
    });

}).then(async () => {

})

