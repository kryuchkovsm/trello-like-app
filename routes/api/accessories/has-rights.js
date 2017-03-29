// rights middleware for access to board objects

const Relation  = require('../../../models/relation');

var hasRights = function(rights, unsubscribe) {
  return hasRights[rights, unsubscribe] || (hasRights[rights, unsubscribe] = function(req, res, next) {
      // TODO refactor this custom conditions ((
      if (unsubscribe === 'unsubscribe') {
        if ( req.user._id === req.body.relation.userId )
          // user can remove himself from relation (unsubscribe)
          next();
        return;
      }

    
      // get boardId from query
      var boardId = req.query.boardId;
      
      // search boardId in request body
      var object = req.body.board
                || req.body.ticket
                || req.body.relation
                || req.body.list;
      
      // if body exist - try to get boardId, or leave id from query
      
      
      if (object) {
        boardId = boardId || object.boardId;
      }
      
      if (!boardId) {
        console.log('Board ID not found!!! O_o');
        res.status(400).send({rightsErr: 'Board ID not found!!! O_o'});
        return;
      }
      
      // find rights overlapping in board settgins, and required rights for action(got from rights.js config file)
      Relation
        .findOne(
          {'board':boardId, 'user': req.user._id }, function(err, data) {
            if (err) {
              res.send(err)
              return;
            }
            
            var rightsOverlap = data.rights
              .filter(n => {
                return rights.indexOf(n) !== -1;
              })
            
            if (rightsOverlap.length <= 0) {
              res.status(403).send({err: 'Action restricted for this user'});
              return;
            }
            
            // if enough rights - go next
            next();
          })
    })
}

module.exports = hasRights;