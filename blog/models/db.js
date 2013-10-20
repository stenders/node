var localStorage = require('localStorage')

var get = function(key){
  var data = localStorage.getItem(key)
  return JSON.parse(data)
}

var save = function(obj, callback){
  var json = JSON.stringify(obj)
  var hasOld = get(obj.name)
  if(hasOld){
    return callback('user name already exsist!');
  }
  localStorage.setItem(obj.name, json);
  callback(null, obj)
}

exports.save = save;
exports.get = get;