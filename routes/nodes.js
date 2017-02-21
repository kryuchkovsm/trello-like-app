var express = require('express')
var router = express.Router();

var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/treeAppDb');

db.on('error', function(err) {
  console.log('connection error:' + err)
});
db.once('open', function() {
  console.log('mongoose connected')
});

// Shema must be moved to another file?
var nodesSchema = Schema({
  name: String,
  children: []
});

nodesSchema.plugin(materializedPlugin);

var nodes = mongoose.model('nodes', nodesSchema);

// Get nodes tree on page init
router.get('/nodes', function(req, res, next) {
  nodes.GetFullArrayTree(function (err, tree) {
    if (err) {
      return console.log(err)
    }

    // костыль для рекусии child.component, когда база пустая
    if (!tree.length) {
      tree = [];
    }

    res.json(tree);
  });
})

router.post('/addroot', function(req, res, next) {
  rootNode = new nodes({name: req.body.nodeName});
  rootNode.save(function(err, data) {
    if (err) {
      console.log(err)
    }

    res.json(data);
  })
})


router.post('/addnode', function(req, res, next) {
  var parentNodeId = mongoose.Types.ObjectId(req.body.parentId);
  var nodename = +new Date();
  var node = {name: nodename} 
  nodes.findOne({_id: parentNodeId}, function(err, doc) {
    if (err) {
      return console.log(err)
    }

    doc.appendChild(node, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    })
  })
});


router.delete('/node', function(req, res, next) {
  console.log('= clear treee action =');
  nodes.remove({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
      res.json(data);
    }
  })
})

module.exports = router;





