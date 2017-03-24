const mongoose = require('mongoose');
const router   = require('express').Router();

const Board    = require('../../models/board');
const List      = require('../../models/list');
const Ticket    = require('../../models/ticket');
const Relation = require('../../models/relation');

var deleteObjects = require('./delobjects');

router.get('/', function(req, res, next) {
  if (req.query._id === 'all') {

    // ==================================================
    Relation
      .find(
        {'user': req.user._id },
        {'board' : true, 'rights': true})
      .populate('board')
      .exec(function (err, data) {
        if (err)
          res.send(err);
        var flateredData = data.map(relBoard => { 
          var newBoard = {};
            newBoard['_id'] = relBoard.board._id;
            newBoard['name'] = relBoard.board.name;
            newBoard['order'] = relBoard.board.order;
            newBoard['rights'] = relBoard.rights;
          console.log(newBoard);
          return newBoard;
        })
        
        console.log('======== populate return boards =======');
        console.log('======== mapped data =======');
        console.log(flateredData);
      })

    // ==================================================
    Relation.find(
      {'user': req.user._id },
      {'board' : true},
      function(err, boardRel) {
        if (err) {
          res.send(err);
          return;
        }
        
        var ids = boardRel.map(boardId => boardId.board);

        Board.find({_id: {$in: ids}}, function(err, boards) {
          if (err) {
            res.send(err);
          }
          console.log('============== boards ============')
          console.log(boards);
          res.json(boards);
        });
      }
    )
    // ==================================================


  }
  else {
    Relation
      .findOne(
        {'board':req.query._id, 'user': req.user._id })
      .populate('board')
      .exec(function (err, data) {
        if (err)
          res.send(err);
        console.log('======== find board by id =======');
        console.log(data);
      })
    
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
    user: req.user._id,
    board: board._id,
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

  deleteObjects(Ticket, 'boardId', boardId, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    deleteObjects(List, 'boardId', boardId, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      deleteObjects(Board, '_id', boardId, (err, result) => {
        if (err) {
          res.send(err);
          return;
        }
        deleteObjects(Relation, 'board', boardId, (err, result) => {
          if (err) {
            res.send(err);
            return;
          }
          res.json({[boardId]: 'ok'});
        });
      });
    });
  });
  
})


module.exports = router