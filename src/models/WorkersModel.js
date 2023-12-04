const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const WorkerSchema = new Schema({

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
    dateOfBirth:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: true
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