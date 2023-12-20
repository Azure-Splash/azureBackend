// This file handles the boot-up of the server 


require('dotenv').config();

const { databaseConnect } = require('./database');
const { app } = require('./server');


// const PORT = process.env.PORT || 3005;

const PORT =  3005;

app.listen(PORT, async () => {
	await databaseConnect();
	console.log("Server running!");
});


