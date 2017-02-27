var express = require('express')
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/trelloAppDb');

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});

// Shema must be moved to another file?
var userSchema = Schema({
  name: String,
  token: String
});


var users = mongoose.model('users', userSchema);


router.get('/users', function(req, res, next) {
  return console.log('/users');
  res.json(null);
})

// Get boards
router.get('/boards', function(req, res, next) {
  return console.log('/boards');
})

router.post('/addboard', function(req, res, next) {
  return  console.log('addboard');
  // rootNode = new nodes({name: req.body.nodeName});
  // rootNode.save(function(err, data) {
  //   if (err) {
  //     console.log(err)
  //   }
  //
  //   res.json(data);
  // })
})


router.delete('/delete', function(req, res, next) {
  console.log('= clear treee action =');
  nodes.remove({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
      res.json(data);
    }
  })
})

module.exports = router;





