const mongoose      = require('mongoose');
const router        = require('express').Router();

const Board         = require('../../models/board');
const List          = require('../../models/list');
const Ticket        = require('../../models/ticket');
const Relation      = require('../../models/relation');

const deleteObjects = require('./accessories/del-objects');
const hasRights     = require('./accessories/has-rights');
const rightsConfig  = require('../../config/rights');

// ========================= Read permissions ====================

router.get('/', function(req, res, next) {
  if (req.query.boardId !== 'all') {
    next()
  }
  else {
    Relation
      .find(
        {'user': req.user._id },
        {'board' : true, 'rights': true})
      .populate('board')
      .exec(function (err, rawBoards) {
        if (err) {
          console.log('get boards error');
          res.send(err);
        }
        var boards = rawBoards.map(rawBoard => {
          return {
            'boardId' :  rawBoard.board._id,
            'name'  :    rawBoard.board.name,
            'order' :    rawBoard.board.order,
            'rights':    rawBoard.rights
          };           
        });
        res.json(boards);
    })
  }
})

router.get('/', hasRights(rightsConfig.board.read), function(req, res, next) {
   if (req.query.boardId) {
      Relation
        .findOne(
          {'board':req.query.boardId, 'user': req.user._id })
        .populate('board')
        .exec(function (err, rawBoard) {
          if (err) {
            console.log('================ ERROR =================');
            console.log('find single board error:' + err.message );
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            res.status(400).send({[fullUrl]: ' failed to load resource'});
            return;
          }

          var board = {
            'boardId':  rawBoard.board._id,
            'name':     rawBoard.board.name,
            'order':    rawBoard.board.order,
            'rights':   rawBoard.rights
          }
          res.status(200).json(board);
        })
    }
})



router.post('/', function(req, res, next) {
  var inputBoard = req.body.board;
  board = new Board({
    _id:   mongoose.Types.ObjectId(),
    name:  inputBoard.name,
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

// ========================= Only owner/write permissions ====================

router.put('/', hasRights(rightsConfig.board.edit), function(req, res, next) {
  var inputBoard = req.body.board;
  Board.findOneAndUpdate(
    { _id:  inputBoard.boardId },
    { $set: { name: inputBoard.name }},
    { new:  true },
    function(err, doc){
      if (err) {
        res.send(500, { error: err });
        return;
      }
      res.json(doc);
    });
})


router.delete('/', hasRights(rightsConfig.board.delete), function(req, res, next) {
  var boardId = req.body.board.boardId;
  var result = {};
  result[boardId] = 'ok';

  // i know, that is bad...
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