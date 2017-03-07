var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
  _id:     Number,
  text:   String,
  listId:  Number,
  boardId: Number,
  order: Number,
});

module.exports = mongoose.model('Ticket', ticketSchema);