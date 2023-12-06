require('dotenv').config()

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { User } = require('./models/UserModel');

databaseConnect().then(async () => {

	console.log("Creating seed data!");


    let testUser = new User({

        firstName: "Scott",
        lastName: "Jones",
        email: "scott@email.com",
        password: "password",
        dateOfBirth: "24 november",
        address: "123 fake st"
    })

    await testUser.save().then(() => {
		console.log(`${testUser.firstName} is in the DB`);
	});


}).then(async () => {
	// await dbDisconnect();
})

