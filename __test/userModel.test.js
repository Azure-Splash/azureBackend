const mongoose = require("mongoose");
const { User } = require("../src/models/UserModel");
const jwt = require('jsonwebtoken');
const request = require('supertest');
require('dotenv').config();

//" beforeAll" runs before all tests and is used to handle setup
beforeAll(async () => {
  // Set up a new MongoDB connection
  const url = process.env.DB_URI
  
});


describe("User Model Test", () => {
  // Define a sample user data object based on the User schema
  const userData = {
    firstName: "Test",
    lastName: "Tester",
    email: "user@gmail.com",
    password: "testpassword",
    age: "34",
    suburb: "Adelaide",
    role: "user",
  };
  // Create a new User instance with the sample data
  const user = new User(userData);

  // each "test" represents a single test case
  // These test checks if the user object has the correct property with the correct value
  test("new user has firstName", () => {
    expect(user).toHaveProperty("firstName", userData.firstName);
  });

  test("new user has lastName", () => {
    expect(user).toHaveProperty("lastName", userData.lastName);
  });

  test("new user has email", () => {
    expect(user).toHaveProperty("email", userData.email);
  });

  test("new user has password", () => {
    expect(user).toHaveProperty("password", userData.password);
  });

  test("new user has DOB", () => {
    expect(user).toHaveProperty("age", userData.age);
  });

  test("new user has suburb", () => {
    expect(user).toHaveProperty("suburb", userData.suburb);
  });


  test("new user has a role", () => {
    expect(user).toHaveProperty("role", userData.role);
  });
});

