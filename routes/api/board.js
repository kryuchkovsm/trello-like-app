const mongoose = require('mongoose');
const router   = require('express').Router();

const Board    = require('../../models/board');
const List      = require('../../models/list');
const Ticket    = require('../../models/ticket');
const Relation = require('../../models/relation');

var deleteObjects = require('./delobjects');

router.get('/', function(req, res, next) {
  if (req.query._id === 'all') {
    Relation.find(
      {'userId': req.user._id },
      {'boardId' : true},
      function(err, boardIDs) {
        if (err) {
          res.send(err);
          return;
        }
        var ids = boardIDs.map(function(boardId) { return boardId.boardId });

        Board.find({_id: {$in: ids}}, function(err, boards) {
          if (err) {
            console.log(err);
          }
          res.json(boards);
        });
      }
    )
  }
  else {
    Board.findOne({'_id': req.query._id},
      function(err, result) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(result);
      });
  }
})

router.post('/', function(req, res, next) {
  var inputBoard = req.body.board;
  board = new Board({
    _id: mongoose.Types.ObjectId(),
    name: inputBoard.name,
    order: inputBoard.order,
  })

  board.save(function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  })

  relation = new Relation({
    userId: req.user._id,
    boardId: board._id,
    boardName: inputBoard.name,
    rights: ['Owner', 'Read', 'Write']
  })

  relation.save(function(err, result) {
    if (err) {
      return res.json(err);
    }
  })
})

router.put('/', function(req, res, next) {
  var inputBoard = req.body.board;
  Board.findOneAndUpdate(
    { _id:  inputBoard._id },
    { $set: { name: inputBoard.name }},
    { new:  true },
    function(err, doc){
      if (err) {
        res.send(500, { error: err });
        return;
      }
      console.log('update result');
      console.log(doc);
      res.json(doc);
    });
})

// TODO update to callback-style
router.delete('/',  function(req, res, next) {
  var boardId = req.body.boardId;
  var result = {};
  result[boardId] = 'ok';

  deleteObjects(Ticket,   'boardId', boardId);
  deleteObjects(List,     'boardId', boardId);
  deleteObjects(Board,    '_id',     boardId);
  deleteObjects(Relation, 'boardId', boardId);

  res.json(result);
})


module.exports = router