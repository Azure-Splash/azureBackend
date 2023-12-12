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

//  pre-hook
WorkerSchema.pre(
	'save',
	async function (next) {
	  const worker = this;
	  // If password wasn't changed to plaintext, skip to next function.
	  if (!worker.isModified('password')) return next();
	  // If password was changed, assume it was changed to plaintext and hash it.
	  const hash = await bcrypt.hash(this.password, 10);
	  this.password = hash;
	  next();
	}
);

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports={
    Worker
}