const express = require('express')
const app = express();
const { body } = require('express-validator');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const helmet = require('helmet');

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// const crypto = require('crypto');
// let encAlgorithm = 'aes-256-cbc';
// let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32);
// let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16);
// let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
// let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

// // Convert a given string into an encrypted string.
// function encryptString(data){
//     return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
// }

// // Turn the encrypted data back into a plaintext string.
// function decryptString(data){
//     return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
// }

// // Assumes an encrypted string is a JSON object.
// // Decrypts that string and turns it into a regular JavaScript object.
// function decryptObject(data){
//     return JSON.parse(decryptString(data));
// }

passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
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
// const cors = require('cors');
// const corsOptions = {
// 	//			frontend localhost,  frontend deployed
// 	origin: ["http://localhost:3000/","http://localhost:3000", "https://someDeployedWebsite.com"],
// 	optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

// Configure API data receiving & sending
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (request,response)=>{
    response.json({
        message:"Azure Splash"
    })
});

// enable cors
app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// add controllers

const UserController = require('./controllers/UserController');
app.use('/users', UserController); 

// const UserController = require('./controllers/UserController');
// app.use('/staff', UserController); 

const PoolController = require('./controllers/PoolController');
app.use('/pools', PoolController); 

const BookingController = require('./controllers/BookingController');
app.use('/bookings', BookingController);



// 404 error route handling
app.get("*", (request, response) => {
    response.status(404).json({
        message: "No route with that path found!"
    });
});



module.exports={
    app
}

