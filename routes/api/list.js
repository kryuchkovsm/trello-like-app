const mongoose    = require('mongoose');
const router      = require('express').Router();

const List        = require('../../models/list');
const Ticket      = require('../../models/ticket');

var deleteObjects = require('./accessories/del-objects');
const hasRights     = require('./accessories/has-rights');
const rightsConfig  = require('../../config/rights');

// find list by board id
router.get('/', hasRights(rightsConfig.list.read), function(req, res, next) {
  List.find({'boardId': req.query.boardId},
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(result);
    })
});

router.post('/', hasRights(rightsConfig.list.add), function(req, res, next) {
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

router.put('/', hasRights(rightsConfig.list.edit),function(req, res, next) {
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


router.delete('/', hasRights(rightsConfig.list.delete), function(req, res, next) {
  var listId = req.body.listId;
  
  console.log('delList ', listId);
  
  deleteObjects(Ticket,   'listId', listId, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    deleteObjects(List,     '_id', listId, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json({[listId]:'ok'});
    });
  });
  
});

module.exports = router;