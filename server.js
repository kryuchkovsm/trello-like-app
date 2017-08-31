const port          = process.env.PORT || 3000;
const path          = require('path');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const Express       = require('express');

const app = new Express();

// Set static folder
app.use(Express.static(path.join(__dirname, 'client')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);

// set up our express application
app.use(morgan('dev')); // log every request to the console

// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Routes ======================================================================
// contain secret for jwt, and social login providers
const authConfig        = require('./config/auth');
const expressJWT        = require('express-jwt');
const passport          = require('passport');
const api               = require('./routes/api');
const routes            = require('./routes/routes');

authenticated = expressJWT({secret: authConfig.jwtAuth.jwtSecret});

app.use(passport.initialize());
// api must be first, because links exclude /api redirect to render application page
app.use('/api', authenticated, api);
app.use('/',  routes);


// Launch ======================================================================
app.listen(port,  function() {
  console.log('Server started on port' + port);
});