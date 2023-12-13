const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function comparePassword(plaintextPassword, hashedPassword) { 
	let doesPasswordMatch = false;

	doesPasswordMatch = await bcrypt.compare(plaintextPassword, hashedPassword);

	return doesPasswordMatch;
}

function generateJwt(userId){

	let newJwt = jwt.sign(
		// Payload
		{userId}, 

		// Secret key for server-only verification
		process.env.USER_JWT_KEY,

		// Options
		{
			expiresIn: "15d"
		}

	);

	return newJwt;
}


module.exports = {
	comparePassword, generateJwt
}