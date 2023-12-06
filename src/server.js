const express = require('express')
const app = express();

app.use(express.json());

app.get("/", (request,response)=>{
    response.json({
        message:"Azure Splash"
    })
});

const { User } = require('./models/UserModel');

module.exports={
    app
}

