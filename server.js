const port          = process.env.PORT || 3000;
const path          = require('path');
const bodyParser    = require('body-parser');
const passport      = require('passport');
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
// TODO move to antoher section

const expressJWT        = require('express-jwt');
const authConfig        = require('./config/auth');
const api               = require('./app/routes/api');
const routes            = require('./app/routes/routes');

authenticated = expressJWT({secret: authConfig.jwtAuth.jwtSecret});

app.use(passport.initialize());
app.use('/',  routes);
app.use('/api', authenticated, api);


// launch ======================================================================
app.listen(port,  function() {
  console.log('Server started on port' + port);
});