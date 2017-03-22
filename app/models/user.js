var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  _id:      mongoose.Schema.Types.ObjectId,
  email:    String,
  password: String,   
  jwt:    String,
  // local            : {
  //   email        : String,
  //   password     : String,
  // },
  facebook         : {
    id           : String,
    email        : String,
    name         : String
  },
  google           : {
    id           : String,
    email        : String,
    name         : String
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);