var deleteObjects = function(Object, fieldName, Id, callback) {
    var query = {};
    query[fieldName] = Id;
    Object
      .find(query, function(err, res) {
        if (err) {
          callback(err, null);
        }
      })
      .remove(function(err, res) {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, res);
      });
};

module.exports = deleteObjects;