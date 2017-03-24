const router   = require('express').Router();

const User     = require('../../models/user');
const Relation = require('../../models/relation');


router.get('/', function(req, res, next) {
  Relation.find(
    {'board': req.query._id },
    {'user' : true},
    function(err, users) {
      if (err) {
        res.send({ error: err });
        return;
      }
      
      var ids = users.map(userRecord => userRecord.user );

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
});

router.post('/', function(req, res, next) {
  relation = new Relation({
    board: req.body.boardId,
    user: req.body.user._id,
    rights: ['Read']
  });

  relation.save(function(err, result) {
    if (err) {
      res.send({ error: err });
      return;
    }
    
    User.findOne(
      {_id: result.user},
      {_id: true, email: true},
      function(err, user) {
        if (err) {
          res.send({ error: err });
          return;
        }
        res.json(user);
      });
  });
});

router.delete('/', function(req, res, next) {
  // TODO is there need to check owner?..
  Relation
    .find({ board: req.body.boardId, user: req.body.userId },
      function(err, result) {
        if (err) {
          res.send({ error: err });
        }
      })
    .remove(function(err, result) {
      if (err) {
        res.send(err)
      }
      res.json(result);
    })
});

module.exports = router;