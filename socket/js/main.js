var socket = io.connect()

var name;
do {
  name = String(prompt('请输入您的用户名')).replace(/^\s+|\s+$/g, '')
} while( !name || name === 'null')

socket.emit('join', name)

var $ = function(id){return document.getElementById(id)}
var text = $('text')
var area = $('area')
var form = $('form')
var userlist = $('users')

form.addEventListener('submit', function(e){
  e.preventDefault()
  if(!text.value) return
  socket.emit('message', text.value)
  form.reset()
})

socket.on('push data', function(data){
  area.value += data + '\n'
})

socket.on('users', updateUser)

function updateUser(users){
  userlist.innerHTML = ''
  users.forEach(function(user){
    var li = document.createElement('li')
    li.appendChild(document.createTextNode(user))
    userlist.appendChild(li)
  })
}