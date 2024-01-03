const mongoose = require("mongoose");
const { Pool } = require("../src/models/PoolModel");
const jwt = require('jsonwebtoken');
const request = require('supertest');
require('dotenv').config();

//" beforeAll" runs before all tests and is used to handle setup
beforeAll(async () => {
  // Set up a new MongoDB connection
  const url = process.env.DB_URI
  
});


describe("Pool Model Test", () => {
  // Define a sample pool data object based on the Pool schema
  const poolData = {
    poolName: "test pool",
    numberOfLanes: 6


  };
  // Create a new pool instance with the sample data
  const pool = new Pool(poolData);

//   each "test" represents a single test case
//   These test checks if the pool object has the correct property with the correct value
  test("new pool has a name", () => {
    expect(pool).toHaveProperty("poolName", poolData.poolName);
  });

  test("new pool has Number of lanes declared", () =>{
    expect(pool).toHaveProperty("numberOfLanes", poolData.numberOfLanes);
  });

});