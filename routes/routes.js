const router = require('express').Router();
const passport = require('passport');

// passport configuration
require('../config/passport')(passport); // pass passport for configuration


// Angular 2 application page page
router.get('/', function(req, res, next) {
    res.render('app.html');
})

// redirect from all another to home app page(app redirect it to necessary page by itself)
router.get('/*', function(req, res, next) {
  res.render('app.html');
})


// it's work ^_^
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
    var result = {err, user, info}
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













// router.post('/authorize', function(req, res, next) {
//   console.log(req.body);
//   passport.authenticate('jwt', { session: false }, function(err, user, info) {
//     console.log('==== err, user, info, req.user: ====');
//     console.log(err);
//     console.log(user);
//     console.log(info);
//     const result = {err, user, info};
//     console.log(req.user);
//     console.log('----------------------------------')
//     // console.log(res);
//     if (err) {
//       console.log('err:');
//       console.log(err);
//       res.json(err);
//       return;
//     }
//     if (!user) {
//       console.log('info:');
//       console.log(info);
//       res.json(info);
//       return;
//     }
//
//     res.json({_id: user._id, email: user.email});
//     }, deserializeUser)(req, res, next)
//   }
// );