const mongoose = require('mongoose')

const Schema = mongoose.Schema; 

const RoleSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: [String],
    required: true,
    unique: false
  }
});


const Role = mongoose.model('Role', RoleSchema);

module.exports = {
  Role
};

