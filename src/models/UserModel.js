const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
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
        required: false
    },
    address:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports={
    User
}



