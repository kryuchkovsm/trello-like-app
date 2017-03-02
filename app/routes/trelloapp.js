const router = require('express').Router();
const passport = require('passport');

//   app.get('/login', function(req, res) {
//     res.render('login.ejs', { message: req.flash('loginMessage') });
//   });
//
 router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

module.exports = router;

//
//   app.get('/signup', function(req, res) {
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
//   });
//
//   app.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/app', // redirect to the secure profile section
//     failureRedirect : '/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
//   }));
//
//   app.get('/app', isLoggedIn, function(req, res) {
//     res.render('app.html', {
//       user : req.user // get the user out of session and pass to template
//     });
//   });
//
//   // FACEBOOK ROUTES =====================
//
//   app.get('/auth/facebook', passport.authenticate('facebook'));
//   app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//       successRedirect : '/app',
//       failureRedirect : '/'
//   }));
//
//   app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
//   });
// };
//
// function isLoggedIn(req, res, next) {
//    if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
