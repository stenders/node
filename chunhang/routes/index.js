/*
 * GET home page.
 */
var crypto = require('crypto'),
    Post = require('../models/post'),
    User = require('../models/user');

module.exports = function(app){
  app.get('/', function(req, res){
    Post.get(null, function(err, posts){
      if(err){
        posts = []
      }

      res.render('index', {
        title: 'Blog',
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      })

    })
  })

  app.get('/reg', checkNotLogin)
  app.get('/reg', function(req, res){
    res.render('reg', {
      title: 'Register',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  })

  app.post('/reg', checkNotLogin)
  app.post('/reg', function(req, res){
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body.password_re;

    if(password_re != password){
      req.flash('error', '两次输入的密码不一致!')
      return res.redirect('/reg')
    }

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name : req.body.name,
      password: password,
      email: req.body.email
    })

    User.get(newUser.name, function(err, user){
      if(user){
        req.flash('error', '用户已存在!')
        return res.redirect('/reg')
      }

      newUser.save(function(err, user){
        if(err){
          req.flash('error', err)
          return res.redirect('/reg')
        }
        req.session.user = user
        req.flash('success', '注册成功!')
        res.redirect('/')
      })
    })
  })

  app.get('/login', checkNotLogin)
  app.get('/login', function(req, res){
    res.render('login', {
      title: 'login',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  })

  app.post('/login', checkNotLogin)
  app.post('/login', function(req, res){
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    User.get(req.body.name, function(err, user){
      if(!user){
        req.flash('error', '用户不存在!')
        return res.redirect('/login')
      }

      if(user.password != password){
        req.flash('error', '密码错误!')
        return res.redirect('/login')
      }

      req.session.user = user
      req.flash('success', '登陆成功!')
      res.redirect('/')
    })
  })

  app.get('/post', function(req, res){
    res.render('post', {
      title: 'post',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  })

  app.post('/post', function(req, res){
    var currentUser = req.session.user,
        post = new Post(currentUser.name, req.body.title, req.body.post);

    post.save(function(err){
      if(err){
        req.flash('error', err)
      } else {
        req.flash('success', '发布成功!')
      }
      res.redirect('/');
    })
  })

  app.get('/logout', checkLogin)
  app.get('/logout', function(req, res){
    req.session.user = null
    req.flash('success', '登出成功!');
    res.redirect('/')
  })

  app.get('/user/:user', function(req, res){
    User.get(req.params.user, function(err, user){
      if(!user){
        req.flash('error', '用户不存在！')
        res.redirect('/')
      }

      res.send(user)
    })
  })

  app.get('/users', function(req, res){
    User.get(null, function(err, users){
      if(err){
        req.flash('error', err)
        res.redirect('/')
      }
      res.render('users', {
        users: users,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      })
    })
  })

  function checkLogin(req, res, next){
    if(!req.session.user){
      req.flash('error', '未登录')
      res.redirect('/login')
    }
    next()
  }

  function checkNotLogin(req, res, next){
    if(req.session.user){
      req.flash('error', '已登录')
      res.redirect('back')
    }
    next()
  }
}