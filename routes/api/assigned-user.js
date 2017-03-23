const router   = require('express').Router();

const User     = require('../../models/user');
const Relation = require('../../models/relation');


router.get('/', function(req, res, next) {
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
});

router.post('/', function(req, res, next) {
  console.log('/assignuser');

  console.log(req.body.boardId);

  relation = new Relation({
    boardId: req.body.boardId,
    userId: req.body.user._id,
    rights: ['Read']
  });

  relation.save(function(err, result) {
    if (err) {
      res.send({ error: err });
      return;
    }
    console.log(result);

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
  });
});

router.delete('/', function(req, res, next) {
  // TODO is there need to check owner?..
  Relation
    .find({ boardId: req.body.boardId, userId: req.body.userId },
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