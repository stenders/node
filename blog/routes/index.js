/*
 * GET home page.
 */

var crypto = require('crypto')
var User = require('../models/user.js')

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', { title: '主页' })
	})
	app.get('/reg', function (req, res) {
		res.render('reg', { title: '注册' });
	});
	app.post('/reg', function (req, res) {
		var name = req.body.name,
				password = req.body.password,
				password_re = req.body.password_re;

		if(password != password_re){
			req.flash('error', 'password not the same.')
			return res.redirect('/reg')
		}

		var md5 = crypto.createHash('md5'),
				password = md5.update(req.body.password).digest('base64');
		var newUser = new User({
			name: req.body.name,
			password: password,
			email : req.body.email
		})

		User.get(newUser.name, function(err, user){
			if(user){
				req.flash('error', 'user already exsist')
				console.log(req.flash.error)
				return res.redirect('/reg')
			}
			newUser.save(function(err, user){
				if(err){
					req.flash('error', err)
				}
				req.session.user = user
				req.flash('success', 'success!')
				res.redirect('/')
			})
		})


	});
	app.get('/login', function (req, res) {
		res.render('login', { title: '登录' });
	});
	app.post('/login', function (req, res) {
	});
	app.get('/post', function (req, res) {
		res.render('post', { title: '发表' });
	});
	app.post('/post', function (req, res) {
	});
	app.get('/logout', function (req, res) {
	});
}