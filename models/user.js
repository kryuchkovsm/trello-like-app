const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(mongoose) {

  const User = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  })
    
  return mongoose.model('User',   User);
}