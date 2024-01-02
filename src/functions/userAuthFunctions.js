const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { User } = require("../models/UserModel");
const crypto = require('crypto');


let encAlgorithm = 'aes-256-cbc';
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32);
let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16);
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

function encryptString(data){
	cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// Turn the encrypted data back into a plaintext string.
function decryptString(data){
	decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}

// Assumes an encrypted string is a JSON object.
// Decrypts that string and turns it into a regular JavaScript object.
function decryptObject(data){
    return JSON.parse(decryptString(data));
}

// compare password on log in
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
	comparePassword, 
	generateJwt

}