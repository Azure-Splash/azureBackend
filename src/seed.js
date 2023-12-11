require('dotenv').config()

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { User } = require('./models/UserModel');
const { Worker } = require('./models/WorkersModel');

databaseConnect().then(async () => {

	console.log("Creating seed data!");


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
    
    let newUser = await User.create({

        firstName: "Jean",
        lastName: "Peters",
        email: "jean@gmail.com",
        password: "password12",
        phoneNumber:"0401438902",
        age: "26",
        suburb: "Mermaid Water",
    });

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

}).then(async () => {

})

