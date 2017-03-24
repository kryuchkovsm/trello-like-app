var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// userId:    Schema.Types.ObjectId,
// boardId:   Schema.Types.ObjectId,

var relationSchema = Schema({
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  board: {
    ref: 'Board',
    type: Schema.Types.ObjectId
  },
  
  // ['Owner', 'Read', 'Write']
  rights:    [String] 
});

module.exports = mongoose.model('Relation', relationSchema);
