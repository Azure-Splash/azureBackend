const express = require('express');
const { body, validationResult } = require('express-validator');



// Validation middleware
app.use(
  body('isadmin').custom(value => {
    if (value !== 'true') {
      throw new Error('Only admin users are allowed.');
    }
    return true;
  })
);

  module.exports= { validationResult }