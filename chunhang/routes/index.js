
/*
 * GET home page.
 */

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', {title: 'Blog'})
  })

  app.get('/login', function(req, res){
    res.render('login', {title: 'login'})
  })

  app.get('/reg', function(req, res){
    res.render('reg', {title: 'Register'})
  })
}