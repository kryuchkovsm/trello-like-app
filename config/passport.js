// config/passport.js
const LocalStrategy     = require('passport-local').Strategy;
const FacebookStrategy  = require('passport-facebook').Strategy;
const GoogleStrategy    = require('passport-google-oauth').Strategy;
const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;

const jwt               = require('jsonwebtoken');
const User              = require('../models/user');
const authConfig        = require('./auth');

module.exports = function(passport) {

// ==========================================================================
// =================================== JWT ==================================
// ==========================================================================
//
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: authConfig.jwtAuth.jwtSecret,
  };
  
  passport.use(new JwtStrategy(jwtOptions,
    function (jwt_payload, done) {
      console.log('jwt-strategy');
      console.log(jwt_payload);
      User.findById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { 'jwt auth Message': 'No user found.'});
        }
      })
    })
  );


  // ==========================================================================
  // ============================= Local Signup ===============================
  // ==========================================================================
  
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ 'email' :  email }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, { 'signupMessage' : 'That email is already taken.' });
        }
        else {

         var newUser            = new User();
          newUser._id      = mongoose.Types.ObjectId();
          newUser.email    = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }

      });
    }));

  // ==========================================================================
  // ============================= Local Login ================================
  // ==========================================================================
  
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) { // callback with email and password from our form
      console.log('local-lognin');
      console.log(req.body);
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, { 'loginMessage': 'No user found.'}); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, { 'loginMessage' : 'Oops! Wrong password.' } ); // create the loginMessage and save it to session as flashdata


        // Create token for logged User
        user.jwt = jwt.sign({'_id'  :user._id, 
                               'email':user.email}, 
                               authConfig.jwtAuth.jwtSecret, 
                               { expiresIn: 631139040 });         
        
        // return {null, user: user.displayName, token: 'JWT ' + token};
        
        // all is well, return successful user
        return done(null, user);
      });

    }));



  // =========================================================================
  // ============================== FACEBOOK =================================
  // =========================================================================
  passport.use(new FacebookStrategy({

      // pull in our app id and secret from our auth.js file
      clientID        : authConfig.facebookAuth.clientID,
      clientSecret    : authConfig.facebookAuth.clientSecret,
      callbackURL     : authConfig.facebookAuth.callbackURL,
      profileFields   : authConfig.facebookAuth.profileFields
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

      // find the user in the database based on their facebook id
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          var newUser            = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id    = profile.id; // set the users facebook id
          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
          newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          // save our user to the database
          console.log(newUser);
          newUser.save(function(err) {
            if (err)
              throw err;

            // if successful, return the new user
            return done(null, newUser);
          });
        }

      });
    }));

};