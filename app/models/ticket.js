var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
  _id:     Number,
  text:   String,
  listId:  String,
  boardId: String,
  order: Number,
  users:   [String]
});

module.exports = mongoose.model('Ticket', ticketSchema);