const router   = require('express').Router();

const User     = require('../../models/user');
const Relation = require('../../models/relation');

const hasRights     = require('./accessories/has-rights');
const rightsConfig  = require('../../config/rights');

router.get('/', function(req, res, next) {
  Relation
    .find(
      {'board': req.query._id })
    .populate('user')
    .exec(function (err, rawUsers) {
      if (err) {
        res.send({ error: err });
        return;
      }
      var users = rawUsers.map(rawUser => {
        return {
          '_id' :    rawUser.user._id,
          'email'  : rawUser.user.email,
          'rights':  rawUser.rights
        };
      });
      res.json(users);
    })
});


router.post('/', hasRights(rightsConfig.users.add), function(req, res, next) {
  var userRights = req.body.relation.rights
  relation = new Relation({
    board: req.body.relation.boardId,
    user: req.body.relation.user._id,
    rights: userRights
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
        var newUser = {
          _id:    user._id,
          email:  user.email,
          rights: userRights
        }
        res.json(newUser);
      });
  });
});

router.delete('/', hasRights(rightsConfig.users.delete, 'unsubscribe'), function(req, res, next) {
  Relation
    .find({ board: req.body.relation.boardId, user: req.body.relation.userId },
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