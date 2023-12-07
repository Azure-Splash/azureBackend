const express = require('express')
const app = express();

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

const { User } = require('./models/UserModel');

const UserRouter = require('./controllers/UserController');
app.use('/users', UserRouter);

module.exports={
    app
}

