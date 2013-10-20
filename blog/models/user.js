
var db = require('./db');

function User(user){
  this.name = user.name
  this.password = user.password
  this.email = user.email
}

module.exports = User

User.prototype.save = function(callback){
  var user = {
    name : this.name,
    password : this.password,
    email : this.email
  }
  db.save(user, function(err, user){
    if(err){
      return callback(err)
    }
    callback(null, user)
  })
}

User.get = function(name, callback){
  var user = db.get(name)
  var err = user ? null : 'user not found.'
  callback(err, user)
}