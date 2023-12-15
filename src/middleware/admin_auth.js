const express = require('express');
const { body, validationResult } = require('express-validator');
const { Worker } = require('../models/WorkersModel');



// Validation middleware
app.use(
  body(Worker.isadmin).custom(value => {
    if (value !== 'true') {
      throw new Error('Only admin users are allowed.');
    }
    return true;
  })
);

  module.exports= { validationResult }