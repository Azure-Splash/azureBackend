const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const isAdmin = (request, response, next) => {
  if (request.user.role.name === 'Admin') {
    return next();
  }
  return response.status(403).send('Forbidden');
};

module.exports={ isAdmin };