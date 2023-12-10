const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const WorkerSchema = new Schema({

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
    isAdmin:{
        type: Boolean,
        default: false 
    }
});

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports={
    Worker
}