const express = require('express')
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);
const corsOptions = {
	origin: ["http://localhost:3000/","http://localhost:3005", "https://azuresplash.netlify.app/"],
	optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// app.use(cors({
//     origin: ["http://localhost:3000/","http://localhost:3005", "https://azuresplash.netlify.app/"],
//     methods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
//     credentials: true,
//   }));
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// Configure API data receiving & sending
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (request,response)=>{
    response.json({
        message:"Azure Splash"
    })
});

// enable cors
// app.use(function(_, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// add controllers

const UserController = require('./controllers/UserController');
app.use('/users', UserController); 

const AdminController = require('./controllers/AdminControllers');
app.use('/admin', AdminController);

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

