const express = require('express')
const app = express();

app.use(express.json());

// const cors = require('cors');
// const corsOptions = {
// 	//			frontend localhost,  frontend deployed
// 	origin: ["http://localhost:3000/","http://localhost:3000", "https://someDeployedWebsite.com"],
// 	optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

// app.use(express.json());

app.get("/", (request,response)=>{
    response.json({
        message:"Azure Splash"
    })
});


const UserController = require('./controllers/UserController');
app.use('/users', UserController); 

const WorkerController = require('./controllers/WorkerController');
app.use('/staff', WorkerController); 

const PoolController = require('./controllers/PoolController');
app.use('/pools', PoolController); 

const BookingController = require('./controllers/BookingController');
app.use('bookings', BookingController);

module.exports={
    app
}

