var path = require('path');
var config = require('./config')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var nodes = require('./routes/nodes')

var express = require('express');
var app = express()


// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('viewengine', 'ejs')
app.engine('html', require('ejs').renderFile);


var jwt = require('express-jwt');
var cors = require('cors');
app.use(cors());
var authCheck = jwt({
  secret: new Buffer('i5zRGlZPiFYmCO_oAEQwbGiFk_N7HggRV8ci_txegwepvHcd4gOlFGyZhO1jMXpE', 'base64'),
  audience: 'tmG1ssKXnkoITIHeobps2HQ8nlwRjYaH'
});

var users = [
  { id: 1, name: 'Todd Motto', image: 'image-1.jpg' },
  { id: 2, name: 'Brad Green', image: 'image-2.jpg' },
  { id: 3, name: 'Igor Minar', image: 'image-3.jpg' }
];

// app.get('/api/users', authCheck, function(req, res) {
//   res.json(users);
// });


// Set static folder
app.use(express.static(path.join(__dirname, 'client')));


// Body parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index);
app.use('/api', nodes);

app.listen(config.get('port'),  function() {
  console.log('Server started on port' + config.get('port'));
});
