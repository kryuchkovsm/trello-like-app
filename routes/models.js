const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(mongoose) {
  const User = new Schema({
    name:   String,
    email:  String
    // password: String,
    // token: String
  })
  
  const Board = new Schema({
    _id:    Number,
    name:   String,
    owner:  String,
    guests: [String],
    lists:  [String]
  })
  
  const List = new Schema({
    _id:     Number,
    name:   String,
    boardId: String,
    order:   Number,
    tickets: [String]
  });

  const Ticket = new Schema({
    _id:     Number,
    text:   String,
    listId:  String,
    boardId: String,
    order: Number,
    users:   [String]
  });
  
  const models = {
    Users :   mongoose.model('Users',   User),
    Boards :  mongoose.model('Boards',  Board),
    Lists :   mongoose.model('Lists',   List),
    Tickets : mongoose.model('Tickets', Ticket)
  };
  
  return models;
}
