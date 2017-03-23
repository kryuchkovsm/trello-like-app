const router   = require('express').Router();

const User     = require('../../models/user');

router.get('/', function(req, res, next) {
  var email = req.query.email;
  if (email) {
    var regex = new RegExp( "^" + email, 'i' );
    User.find({'email': regex}, {'email': true, '_id': true}, function (err, result) {
      if (err)
        return res.json(err);
      console.log('/search-user')
      console.log(result);
      res.json(result);
    })
  }
})

module.exports = router