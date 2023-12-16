const express = require('express')
const app = express();
const cors = require('cors');

const helmet = require('helmet');

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));


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

const WorkerController = require('./controllers/WorkerController');
app.use('/staff', WorkerController); 

const PoolController = require('./controllers/PoolController');
app.use('/pools', PoolController); 

const BookingController = require('./controllers/BookingController');
app.use('/bookings', BookingController);

// error route handling
app.get("*", (request, response) => {
    response.status(404).json({
        message: "No route with that path found!"
    });
});

app.use((error, request, response, next) => {
    console.log(`Error: ${error}`)
    if (response.headersSent) {
        return next(error);
    }
    if (response.statusCode === 200) {
        response.status(500);
    }
    response.json({
        errors: error.toString(),
    });
});


module.exports={
    app
}

