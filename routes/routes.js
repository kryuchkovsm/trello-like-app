const router = require('express').Router();
const passport = require('passport');

// passport configuration
require('../config/passport')(passport); // pass passport for configuration

// Angular 2 application page page
router.get('/', function(req, res, next) {
    res.render('app.html');
});

// redirect from all another to home app page(app redirect it to necessary page by itself)
router.get('/*', function(req, res, next) {
  res.render('app.html');
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    const result = {err, user, info};
    if (err) {
      // console.log(err);
      return next(err);
    }
    if (!user) {
      return res.json(result);
    }
    return res.json(result);
  })(req, res, next);
});

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    const result = {err, user, info}
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(result);
    }
    return res.json(result);
  })(req, res, next);
});

// FACEBOOK ROUTES =====================

// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect : '/app',
//     failureRedirect : '/'
//   }));

module.exports = router;