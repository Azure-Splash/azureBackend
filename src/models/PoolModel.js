const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const PoolSchema = new Schema({
    poolName:{
        type: String,
        required: true,
        unique: true
    },
    numberOfLanes:{
        type: Number,
        required: true,
        unique: false
    }


});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports={
    Pool
}
