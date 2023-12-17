
const { User } = require('../models/UserModel');

const isAdmin = (request, response, next) => {
  if (request.user.role.name === 'admin') {
    return next();
  }
  return response.status(403).send('Forbidden');
};

module.exports={ isAdmin };