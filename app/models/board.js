var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = Schema({
  _id:     Schema.Types.ObjectId,
  name:    String,
  order:   Number
});

module.exports = mongoose.model('Board', boardSchema);