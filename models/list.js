var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = mongoose.Schema({
  _id:     Schema.Types.ObjectId,
  owner:   String,
  name:    String,
  boardId: String,
  order:   Number,
  // tickets: [String]
});

module.exports = mongoose.model('List', listSchema);