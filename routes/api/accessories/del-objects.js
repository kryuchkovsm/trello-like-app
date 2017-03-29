var deleteObjects = function(Object, fieldName, id, callback) {
    var query = {[fieldName]: id};   
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