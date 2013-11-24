http = require 'http'
socket = require 'socket.io'
url = require 'url'
fs = require 'fs'

app = http.createServer (req, res) ->
  pathname = url.parse(req.url).pathname
  if pathname is '/' or pathname.indexOf('.html') isnt -1
    fs.readFile './index.html', (err, data) ->
      res.writeHead 200, 'Content-Type': 'text/html'
      res.end data
  else if pathname.indexOf('.css') isnt -1
    fs.readFile './css/index.css', (err, data) ->
      res.writeHead 200, 'Content-Type' : 'text/css'
      res.end data
  else if pathname.indexOf('.js') isnt -1
    fs.readFile './js/main.js', (err, data) ->
      res.writeHead 200, 'Content-Type' : 'text/javascript'
      res.end data
  else if pathname.indexOf('.ttf') isnt -1
    fs.readFile './css/jr_hand.ttf', (err, data) ->
      res.writeHead 200, 'Content-Type' : 'application/x-font-ttf'
      res.end data

app.listen 3000

io = socket.listen app

users = {}
posts = []

io.sockets.on 'connection', (client) ->

  client.on 'join', (name) ->
    if name of users
      return client.emit 'multi users'
    else
      users[name] = name

    client.set 'name', name
    client.broadcast.emit 'users', users
    client.emit 'users', users

    client.emit 'push data', posts

    console.log 'User: ' + name + ' has connected.'

  client.on 'disconnect', ->
    client.get 'name', (err, name) ->
      if name of users
        delete users[name]
      client.broadcast.emit 'users', users

  client.on 'message', (data) ->
    client.get 'name', (err, name) ->
      dialog = name + ': <small>' + data.time + '</small>' + data.msg
      posts.push dialog
      client.broadcast.emit 'push data', dialog
      client.emit 'push data', dialog
