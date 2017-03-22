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

router.post('/authorize', function(req, res, next) {
  console.log(req.body);
  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    console.log('==== err, user, info, req.user: ====');
    console.log(err);
    console.log(user);
    console.log(info);
    const result = {err, user, info};
    console.log(req.user);
    console.log('----------------------------------')
    // console.log(res);
    if (err) {
      console.log('err:');
      console.log(err);
      res.json(err);
      return;
    }
    if (!user) {
      console.log('info:');
      console.log(info);
      res.json(info);
      return;
    }
    
    res.json({_id: user._id, email: user.email});
    })(req, res, next)
  }
);

// it's work ^_^
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);
    const result = {err, user, info};
    if (err) {
      // console.log(err);
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

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
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


router.get('/b/:id', isLoggedIn, function(req, res, next) {
  console.log('------------------')
  console.log(req.params.id);
  res.render('app.html');
});

router.get('/dashboard', isLoggedIn, function(req, res, next) {
  res.render('app.html');
});

router.get('/forbidden', function(req,res, next) {
  res.json({'result':'401', 'navigate':'forbidden'});
})

router.get('/signup', function(req, res, next) {
  res.render('app.html', { message: 'signup server message' });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/app', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : false // allow flash messages
}));


// FACEBOOK ROUTES =====================

// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect : '/app',
//     failureRedirect : '/'
//   }));

router.get('/logout', function(req, res) {
  req.logout();
  res.render('app.html');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.render('app.html');
}
