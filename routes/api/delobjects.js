var deleteObjects = function(Object, fieldName, Id) {
    var query = {};
    query[fieldName] = Id;
    Object
      .find(query, function(err, res) {
        if (err) {
          res.send({ error: err });
          return;
        }
        console.log(res);
      })
      .remove(function(err, res) {
        if (err) {
          res.send({ error: err });
          return;
        }
        console.log(res);
      });
};

module.exports = deleteObjects;