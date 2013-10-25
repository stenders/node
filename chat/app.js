var fs = require('fs')
var http = require('http')
var socketio = require('socket.io')

var server = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(fs.readFileSync('./index.html'))
}).listen(3000, function(){
  console.log('listen at: 3000')
})


socketio.listen(server).on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('Message received: ' + msg)
    socket.broadcast.emit('message', msg)
  })
})