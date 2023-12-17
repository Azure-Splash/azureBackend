const mongoose =require('mongoose')
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName:{
        type: String,
        required: true,
        unique: false
    },
    lastName:{
        type: String,
        required: true,
        unique: false
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        unique: false
    },
    phoneNumber:{
        type:String, 
        unique:true,
        validate: {
        validator: function(v) {
          return /^([0-9]{10}$)/.test(v);
        }},
        required: true

    },
    age:{
        type: String,
        required: false,
        unique: false
    },
    suburb:{
        type: String,
        required: true,
        unique: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Role", 
        required: true
    },
});

//  pre-hook
UserSchema.pre(
	'save',
	async function (next) {
	  const user = this;
	  // If password wasn't changed to plaintext, skip to next function.
	  if (!user.isModified('password')) return next();
	  // If password was changed, assume it was changed to plaintext and hash it.
	  const hash = await bcrypt.hash(this.password, 10);
	  this.password = hash;
	  next();
	}
);

const User = mongoose.model('User', UserSchema);

module.exports={
    User
}



