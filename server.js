const Express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config')
const index = require('./routes/index')
const api = require('./routes/api')

const app = new Express();


// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('viewengine', 'ejs')
app.engine('html', require('ejs').renderFile);


// Set static folder
app.use(Express.static(path.join(__dirname, 'client')));


// Body parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index);
app.use('/api', api);


app.listen(config.get('port'),  function() {
  console.log('Server started on port' + config.get('port'));
});
