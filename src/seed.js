require('dotenv').config()

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { User } = require('./models/UserModel');
const { Pool } = require('./models/PoolModel');
const { Booking } = require('./models/BookingModel');
const { Role } = require('./models/RolesModel');


databaseConnect().then(async () => {

	console.log("Creating seed data!");


    // Roles

    let adminRole = await Role.create({
        name: "Admin",
        permissions: ['create', 'read', 'update', 'delete']
    })

    let customerRole = await Role.create({
        name: "Customer",
        permissions: ['read']
    })

    let workerRole = await Role.create({
        name: "Worker",
        permissions: ['create', 'read', 'update', 'delete']
    })

    // Admin user 
    let newAdmin = await User.create({

        firstName: "Stacy",
        lastName: "Jones",
        email: "stacy@azure.com",
        password: "password",
        phoneNumber:"0404999222",
        age: "45",
        suburb: "Burleigh",
        role: adminRole._id
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
        role: workerRole._id
    });

    let newUser1 = await User.create({

        firstName: "Tom",
        lastName: "Roman",
        email: "tom@azure.com",
        password: "password",
        phoneNumber:"0402663123",
        age: "30",
        suburb: "Miami",
        role: customerRole._id
    });

    let newUser2 = await User.create({

        firstName: "John",
        lastName: "Peters",
        email: "john@gmail.com",
        password: "password12",
        phoneNumber:"0401438904",
        age: "34",
        suburb: "Adelaide",
        role: customerRole._id
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
        user: newUser._id,
        pool: newIndoorPool._id,
        lane: "4",
        date: "1/12/23",
        time: "1pm"
    });

}).then(async () => {

})

