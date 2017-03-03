const router = require('express').Router();
const passport = require('passport');

// passport configuration
require('../../config/passport')(passport); // pass passport for configuration

//home page
router.get('/', function(req, res, next) {
  res.render('app.html');
})

// redirect to login page in client app
router.get('/login', function(req, res, next) {
  res.render('app.html');
})

// it's work ^_^
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    var result = {err, user, info}
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(result);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err);
      }

      return res.json(result);
    });
  })(req, res, next);
});

router.get('/dashboard', function(req, res, next) {
  res.render('app.html');
});


router.get('/forbidden', function (req, res, next) {
  res.render('app.html');
})

router.get('/board', function(req,res, next) {
  res.render('app.html');
})

router.get('/app', function(req,res, next) {
  res.render('app.html');
})

router.get('/failure', function(req,res, next) {
  res.json({'result':'401', 'navigate':'failure'});
})

router.get('/signup', function(req, res, next) {
  res.render('app.html', { message: 'signup server message' });
});



// router.get('/', isLoggedIn, function(req, res) {
//   res.render('app.html', {
//     user : req.user // get the user out of session and pass to template
//   });
// });


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/app', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : false // allow flash messages
}));



// FACEBOOK ROUTES =====================

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/app',
    failureRedirect : '/'
  }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/forbidden');
}
