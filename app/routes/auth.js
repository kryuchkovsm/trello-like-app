const User = require('../models/user');
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');


router.get('/', function(req, res, next) {
  // res.render('index.ejs');
  res.render('app.html');
})

router.get('/login', function(req, res, next) {
  res.render('app.html');
})

router.get('/forbidden', function (req, res, next) {
  res.render('app.html');
})

router.get('/app', function(req,res, next) {
  res.render('app.html');
})

// router.get('/', isLoggedIn, function(req, res) {
//   res.render('app.html', {
//     user : req.user // get the user out of session and pass to template
//   });
// });


// router.get('/login', function(req, res, next) {
//   res.render('login.ejs', { message: req.flash('loginMessage') });
// });

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/app', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/app', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
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