
http = require 'http'

fs = require 'fs'

server = http.createServer (req, res) ->
  fs.readFile './index.html', (err, data) ->
    res.writeHead 200, 'Content-Type': 'text/html'
    res.end data, 'utf-8'
    return
  return
.listen 3000

io = require('socket.io').listen server

io.sockets.on 'connection', (socket) ->
  socket.on 'message', (data) ->
    socket.broadcast.emit 'push data', data
    socket.emit 'push data', data
    return
  return