var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema.Types.ObjectId

var boardSchema = Schema({
  _id:     Schema.Types.ObjectId,
  name:    String,
  order:   Number
  // owner:   String,
  // guests:  [{
  //   _id: { type: String, unique: true },
  //   temail: { type: String, unique: true },
  // }]
});

module.exports = mongoose.model('Board', boardSchema);