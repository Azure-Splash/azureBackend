const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const PoolSchema = new Schema({


});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports={
    Pool
}