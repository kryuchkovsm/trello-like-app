var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema.Types.ObjectId

// rights [read, write, owner]
var relationSchema = Schema({
  userId:    Schema.Types.ObjectId,
  boardId:   Schema.Types.ObjectId,
  rights:    [String]
});

module.exports = mongoose.model('Relation', relationSchema);
