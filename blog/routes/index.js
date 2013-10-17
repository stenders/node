/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Blog' });
};

exports.user = function (req, res) {
	res.render('user', { title: 'home page', user: req.params.user });
}
exports.reg = function (req, res) {
	res.render('reg',{ title: 'Register'});
}
exports.login = function (req, res) {
	res.render('login',{ title: 'Login'});
}
exports.logout = function (req, res) {
	res.send('logout',{ title: 'Logout'});
}

exports.post = function (req, res) {
  res.send('1');
}
exports.doLogin = function (req, res) {
  res.send('1');
}
exports.doReg = function (req, res) {
  res.send('1');
}