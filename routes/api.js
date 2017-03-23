const router   = require('express').Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trelloAppDb');

const db       = mongoose.connection;

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});

router.use('/board',        require('./api/board'));
router.use('/list',         require('./api/list'));
router.use('/ticket',       require('./api/ticket'));
router.use('/usersearch',   require('./api/user-search'));
router.use('/assigneduser', require('./api/assigned-user'));

module.exports = router;
