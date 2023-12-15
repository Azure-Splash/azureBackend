const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Validation middleware
app.use(
  body('role').custom(value => {
    if (value !== 'admin') {
      throw new Error('Only admin users are allowed.');
    }
    return true;
  })
);

  module.exports= { validationResult }