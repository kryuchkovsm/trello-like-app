const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

const config = require('./config')
const Express = require('express');


const api = require('./app/routes/api')
const index = require('./app/routes/index')

const app = new Express();


// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);


// Set static folder
app.use(Express.static(path.join(__dirname, 'client')));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Body parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', index);
app.use('/api', api);

// routes ======================================================================
require ('./app/routes/routes')(app, passport);


// launch ======================================================================
app.listen(config.get('port'),  function() {
  console.log('Server started on port' + config.get('port'));
});
