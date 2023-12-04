const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const PoolSchema = new Schema({
    poolName:{
        type: String,
        required: true,
    },
    laneNumnber:{
        type: Number,
        required: true,
        min: 1,
        max:6
    }


});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports={
    Pool
}
