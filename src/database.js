const mongoose = require('mongoose')


/**
 * Connect or create and connect to database
 */

async function databaseConnect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/AzureDB');
        console.log(`Database Connected`);
    }catch(error){
        console.warn(`Failed to connect \n ${Json.stringify(error)}`)
    }

    }

module.exports={
    databaseConnect
}
