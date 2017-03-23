var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = mongoose.Schema({
  _id:        Schema.Types.ObjectId,
  text        : String,
  description : String,
  listId      : String,
  boardId     : String,
  order       : Number,
  lastUpdate  : Date
});

module.exports = mongoose.model('Ticket', ticketSchema);