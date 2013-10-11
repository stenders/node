
/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.names = function(req, res){
  res.send('hello, ' + req.params.username)
}