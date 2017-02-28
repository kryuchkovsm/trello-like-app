const router = require('express').Router();
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const models = require('../models/board-components')(mongoose);
const User = require('../models/user')(mongoose);
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/trelloAppDb');

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});


router.get('/users', function(req, res, next) {
  User.find({}, function (err, result) {
    if (err)
      return console.log(err);
    console.log(result);
    res.json(result);
  })
})


router.get('/boards', function(req, res, next) {
  models.Boards.find({}, function (err, result) {
    if (err)
      return console.log(err);
    res.json(result);
  })
})

router.get('/lists', function(req, res, next) {
  models.Lists.find({}, function (err, result) {
    if (err)
      return console.log(err);
    res.json(result);
  })
})

router.get('/tickets', function(req, res, next) {
  models.Tickets.find({}, function (err, result) {
    if (err)
      return console.log(err);
    console.log(result);
    res.json(result);
  })
})

router.post('/addlist', function(req, res, next) {
  var inputList = req.body.list;

  list = new models.Lists({
    _id: inputList._id,
    name: inputList.name,
    boardId: inputList.boardId,
    order: inputList.order,
    tickets:[]
  })

  list.save(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })

})

router.post('/addboard', function(req, res, next) {
  console.log('addBoard');
  var inputBoard = req.body.board;

  console.log(inputBoard);
  console.log(inputBoard.title);


  board = new models.Boards({
    _id: inputBoard._id,
    name: inputBoard.name,
    order: inputBoard.order
  })

  board.save(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })

})


// router.delete('/delete', function(req, res, next) {
//   console.log('= clear treee action =');
//   nodes.remove({}, function(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('success');
//       res.json(data);
//     }
//   })
// })

module.exports = router;





