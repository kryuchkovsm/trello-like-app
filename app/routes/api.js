const router = require('express').Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Board = require('../models/board');
const List = require('../models/list');
const Ticket = require('../models/ticket');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/trelloAppDb');

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});


router.get('/user', isLoggedIn, function(req, res, next) {
  console.log(req.user);
  res.json(req.user);
})

router.get('/users', isLoggedIn,  function(req, res, next) {
  User.find({}, function (err, result) {
    if (err)
      return console.log(err);
    res.json(result);
  })
})

router.get('/boards', function(req, res, next) {
  Board.find({}, function (err, result) {
    if (err)
      return console.log(err);
    res.json(result);
  })
})

router.get('/lists', function(req, res, next) {
  List.find({}, function (err, result) {
    if (err)
      return console.log(err);
    res.json(result);
  })
})

router.get('/tickets', function(req, res, next) {
  Ticket.find({}, function (err, result) {
    if (err)
      return console.log(err);
    console.log(result);
    res.json(result);
  })
})

router.post('/addlist', function(req, res, next) {
  var inputList = req.body.list;

  list = new List({
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


  board = new Board({
    _id: inputBoard._id,
    name: inputBoard.name,
    order: inputBoard.order
  })
  
  console.log(board);
  
  board.save(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })

})

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}



