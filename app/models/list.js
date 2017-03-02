var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
  _id:     Number,
  name:   String,
  boardId: String,
  order:   Number,
  tickets: [String]
});

module.exports = mongoose.model('List', listSchema);