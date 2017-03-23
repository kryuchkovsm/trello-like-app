const mongoose      = require('mongoose');
const router        = require('express').Router();

const Ticket        = require('../../models/ticket');
const deleteObjects = require('./delobjects');

// get selected ticket for ticketdetails.component
router.get('/', function(req, res, next) {
  if (req.query.listId) {
    console.log(req.query.listId)
    Ticket.find({'listId': req.query.listId},
      // {'text':true, 'order': true },
      function (err, result) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(result);
      })
  }
  else {
    Ticket.findOne({'_id': req.query.ticketId},
      function (err, result) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(result);
      })  
  }
})

router.post('/', function(req, res, next) {
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

router.put('/', function(req, res, next) {
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

// TODO update to callback-style
router.delete('/', function(req, res, next) {
  var ticketId = req.body.ticketId;
  var result = {};
  result[ticketId] = 'ok';

  console.log('delTicket: ', ticketId);

  deleteObjects(Ticket,   '_id', ticketId);

  res.json(result);
})

module.exports = router
