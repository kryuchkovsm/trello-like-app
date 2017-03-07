var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
  _id:     Number,
    name:  String,
  owner:   String,
  guests:  [String],
  // lists:   [String]
});

module.exports = mongoose.model('Board', boardSchema);