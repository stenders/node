var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res){
  fs.readFile('./index2.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(data, 'utf-8')
  })
}).listen(3000)

var io = require('socket.io').listen(server)

var number = 0
io.sockets.on('connection', function(socket){
  number ++
  socket.broadcast.emit('lookout', {num: number})
  socket.emit('lookout',{num: number})

  socket.on('disconnect', function(){
    number --
    socket.broadcast.emit('lookout', {num: number})
  })
})


console.log('running at 3000')