const express = require('express')
const app = express();

app.get("/", (request,response)=>{
    response.json({
        message:"Azure Splash"
    })
});

module.exports={
    app
}

