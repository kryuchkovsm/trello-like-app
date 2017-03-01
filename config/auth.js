// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID'      : '1351737858219109', // your App ID
    'clientSecret'  : '30b4e0c9857098103802080e50dcb7d8', // your App Secret
    'callbackURL'   : 'http://localhost:3001/auth/facebook/callback',
    'profileFields': ['id', 'email', 'name'],
  },

  'twitterAuth' : {
    'consumerKey'       : 'your-consumer-key-here',
    'consumerSecret'    : 'your-client-secret-here',
    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID'      : '984764594889-g02sjro3amagvams3nm0t8ere81s3kj4.apps.googleusercontent.com',
    'clientSecret'  : 'Ncw9Pnb0PX4ZAvs8Yaslro64',
    'callbackURL'   : 'http://localhost:3001/auth/google/callback'
  }

};