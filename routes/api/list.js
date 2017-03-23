const mongoose    = require('mongoose');
const router      = require('express').Router();

const List        = require('../../models/list');
const Ticket      = require('../../models/ticket');

var deleteObjects = require('./delobjects');

// find list by board id
router.get('/', function(req, res, next) {
  List.find({'boardId': req.query._id},
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(result);
    })
});

router.post('/', function(req, res, next) {
  var inputList = req.body.list;
  console.log('add list');
  console.log(inputList.action);
  list = new List({
    _id:      mongoose.Types.ObjectId(),
    name:     inputList.name,
    boardId:  inputList.boardId,
    order:    inputList.order,
    // tickets:  []
  });

  list.save(function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  })
});

router.put('/', function(req, res, next) {
  var inputList = req.body.list;
  List.findOneAndUpdate(
    { _id:  inputList._id },
    { name: inputList.name },
    { new:  true},
    function(err, doc){
      if (err) {
        res.send(500, { error: err });
        return;
      }
      res.json(doc);
    });
});


// TODO update to callback-style
router.delete('/', function(req, res, next) {
  var listId = req.body.listId;
  var result = {};
  result[listId] = 'ok';

  console.log('delList ', listId);
  deleteObjects(Ticket,   'listId', listId);
  deleteObjects(List,     '_id', listId);

  res.json(result);
});

module.exports = router;