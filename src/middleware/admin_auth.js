const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await user.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const role = await Role.findOne({ name: user.role });
      if (!role) {
        return done(null, false, { message: 'Invalid role.' });
      }
      return done(null, user, { role: role });
    } catch (err) {
      return done(err);
    }
  })
);

const isAdmin = (request, response, next) => {
  if (request.user.role.name === 'admin') {
    return next();
  }
  return response.status(403).send('Forbidden');
};

module.exports={ isAdmin };