const mongoose      = require('mongoose');
const router        = require('express').Router();
const Ticket        = require('../../models/ticket');
const deleteObjects = require('./accessories/del-objects');
const hasRights     = require('./accessories/has-rights');
const rightsConfig  = require('../../config/rights');

// get selected ticket for ticketdetails.component
router.get('/', function(req, res, next) {
  if (!req.query.listId) {
    next();
  }
  else {
     console.log(req.query.listId);
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
});

router.get('/', hasRights(rightsConfig.ticket.read), function(req, res, next) {
  Ticket.findOne({'_id': req.query.ticketId},
    function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(result);
    })
});



router.post('/', hasRights(rightsConfig.ticket.add), function(req, res, next) {
  const inputTicket = req.body.ticket;

  ticket = new Ticket({
    _id:        mongoose.Types.ObjectId(),
    text:       inputTicket.text,
    boardId:    inputTicket.boardId,
    listId:     inputTicket.listId,
    order:      inputTicket.order,
    lastUpdate: new Date()
  });

  ticket.save(function(err, result) {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.json(result);
  })
});

router.put('/', hasRights(rightsConfig.ticket.edit), function(req, res, next) {
  const inputTicket = req.body.ticket;
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
        return res.json(err);
      res.json(result);
    })
  })
});


router.delete('/', hasRights(rightsConfig.ticket.delete), function(req, res, next) {
  const ticketId = req.body.ticket._id;
  
  deleteObjects(Ticket, '_id', ticketId, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json({[ticketId]:'ok'});
  })
  
});

module.exports = router;
