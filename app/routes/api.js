const router   = require('express').Router();
const mongoose = require('mongoose');

const User     = require('../models/user');
const Board    = require('../models/board');
const List     = require('../models/list');
const Ticket   = require('../models/ticket');
const Relation = require('../models/relation');

const Schema   = mongoose.Schema;
const db       = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/trelloAppDb');

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});


router.get('/boardlist', canRead, function(req, res, next) {
  console.log('inside boardlist');
  console.log(req.user);
  console.log(req.headers);
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
})

router.get('/board', function(req, res, next) {
  Board.findOne({'_id': req.query._id},
    function(err, result) {
      if (err) {
        res.send(err);
        return;
      }
        res.json(result);
      });
})

router.get('/lists', function(req, res, next) {
  List.find({'boardId': req.query._id},
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
    res.json(result);
  })
})

router.get('/tickets', function(req, res, next) {
  Ticket.find({'listId': req.query.listId},
              // {'text':true, 'order': true },
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
    res.json(result);
  })
})

router.get('/ticket', function(req, res, next) {
  Ticket.findOne({'_id': req.query.ticketId},
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(result);
    })
})

router.post('/board', function(req, res, next) {
  console.log('addBoard');
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

router.put('/board', function(req, res, next) {
  
  var inputBoard = req.body.board;
  console.log('input board');
  console.log(inputBoard);
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
router.post('/delboard',  function(req, res, next) {
  var boardId = req.body.boardId;
  var result = {};
  result[boardId] = 'ok';
  
  console.log('delBoard: ', boardId);

  deleteObjects(Ticket,   'boardId', boardId);
  deleteObjects(List,     'boardId', boardId);
  deleteObjects(Board,    '_id',     boardId);
  deleteObjects(Relation, 'boardId', boardId);
  
  res.json(result);
})

// TODO update to callback-style
router.post('/delticket', function(req, res, next) {
  var ticketId = req.body.ticketId;
  var result = {};
  result[ticketId] = 'ok';

  console.log('delTicket: ', ticketId);

  deleteObjects(Ticket,   '_id', ticketId);
  
  res.json(result);
})

router.post('/list', function(req, res, next) {
  var inputList = req.body.list;
  console.log('add list');
  console.log(inputList.action);
  list = new List({
    _id:      mongoose.Types.ObjectId(),
    name:     inputList.name,
    boardId:  inputList.boardId,
    order:    inputList.order,
    // tickets:  []
  })

  list.save(function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  })
})

router.put('/list', function(req, res, next) {
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
})


// TODO update to callback-style
router.delete('/list', function(req, res, next) {
  var listId = req.body.listId;
  var result = {};
  result[listId] = 'ok';

  console.log('delList ', listId);
  deleteObjects(Ticket,   'listId', listId);
  deleteObjects(List,     '_id', listId);

  res.json(result);
})



router.post('/addticket', function(req, res, next) {
  var inputTicket = req.body.ticket;

  ticket = new Ticket({
    _id:        mongoose.Types.ObjectId(),
    text:       inputTicket.text,
    boardId:    inputTicket.boardId,
    listId:     inputTicket.listId,
    order:      inputTicket.order,
    lastUpdate: new Date()
  })

  ticket.save(function(err, result) {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.json(result);
  })

})

router.post('/updateticket', function(req, res, next) {
  var inputTicket = req.body.ticket;
  console.log(inputTicket);
  
  Ticket.findById(inputTicket._id, function (err, ticket) {
    if (err) {
      res.send({ error: err });
      return;
    }
    ticket.text = inputTicket.text;
    ticket.description = inputTicket.description;
    ticket.lastUpdate = new Date();
    
    console.log(ticket);
    ticket.save(function(err, result) {
      if (err)
        return res.json(err)
      res.json(result);
    })
  })
})

router.post('/assignuser', function(req, res, next) {
  console.log('/assignuser');
  
  console.log(req.body.boardId);

  relation = new Relation({
    boardId: req.body.boardId,
    userId: req.body.user._id,
    rights: ['Read']
  })

  relation.save(function(err, result) {
    if (err) {
      res.send({ error: err });
      return;
    }
    console.log(result)

    User.findOne(
      {_id: result.userId},
      {_id: true, email: true},
      function(err, user) {
        if (err) {
          res.send({ error: err });
          return;
        }
        console.log(user);
        res.json(user);
      });
  })
})

router.post('/removeassigneduser', function(req, res, next) {

  // TODO is there need to ckeck owner?..
   Relation
     .find({ boardId: req.body.boardId, userId: req.body.userId },
       function(err, result) {
         if (err) {
           res.send({ error: err });
           return;
         }
       })
     .remove(function(err, result) {
       if (err) {
         res.send(err)
       }
        res.json(result);
      })
})

router.get('/assignedusers', function(req, res, next) {
  Relation.find(
    {'boardId': req.query._id },
    {'userId' : true},
    function(err, userIDs) {
      if (err) {
        res.send({ error: err });
        return;
      }

      var ids = userIDs.map(function(userId) { return userId.userId });

      User.find(
        {_id: {$in: ids}},
        {_id: true, email: true},
        function(err, users) {
          if (err) {
            res.send({ error: err });
            return;
          }
          res.json(users);
        });
    }
  )
})


module.exports = router;

// TODO update to callback-style
function deleteObjects(Object, fieldName, Id) {
  var query = {};
  query[fieldName] = Id;
  Object.find(query, function(err, res) {
    if (err) {
      res.send({ error: err });
      return;
    }
    console.log(res);
  }).remove(function(err, res) {
    if (err) {
      res.send({ error: err });
      return;
    }
    console.log(res);
  });
}



// route middleware to make sure a user is logged in
function canRead(req, res, next) {
  return next();
  // if user is authenticated in the session, carry on
  // if (req.user._id)
  //   return next();

  // if they aren't redirect them to the home page
  // res.render('app.html');
}



