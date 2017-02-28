module.exports = function(mongoose) {
  const User = new Schema({
    email: string,
    // password: string,
    token: string
  })
  
  const Board = new Schema({
    _id: String,
    name: String,
    owner: String,
    guests: [String],
    lists: [String]
  })
  
  const List = new Schema({
    _id: String,
    title: String,
    boardId: String,
    order: number,
    tickets: [String]
  });

  const Ticket = new Schema({
    _id: String,
    title: String, 
    listId: String,
    boardId: String,
    order: number,
  });
  
  const models = {
    Users : mongoose.model('Users', User),
    Boards : mongoose.model('Boards', Board),
    Lists : mongoose.model('Lists', List),
    Tickets : mongoose.model('Tickets', Ticket)
  };
  
  return models;
}
