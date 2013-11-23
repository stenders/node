(function(){

var socket = io.connect()

var name;
do {
  name = String(prompt('请输入您的用户名')).replace(/^\s+|\s+$/g, '')
} while( !name || name === 'null')

socket.emit('join', name)

var $ = function(id){return document.getElementById(id)}
var text = $('text')
var area = $('dialog')
var form = $('form')
var num  = $('num')
var userlist = $('users')

form.addEventListener('submit', function(e){
  e.preventDefault()
  if(!text.value) return
  socket.emit('message', render(text.value))
  text.value = null
})

socket.on('push data', function(data){
  if(Object.prototype.toString.call(data) === '[object Array]'){
    data.forEach(function(post){
      updateData(area, post)
    })
  } else {
    updateData(area, data)
  }
  area.scrollTop = area.scrollHeight
})

socket.on('users', updateUser)

function updateUser(users){
  userlist.innerHTML = ''
  users.forEach(function(user){
    updateData(userlist, user)
  })
  num.innerHTML = users.length
}

function updateData(bin, data){
  var li = document.createElement('li')
  li.innerHTML = data
  bin.appendChild(li)
}

var color = $('color')
var fontSize = $('font-size')
var fontFamily = $('font-family')
var fontWeight = $('font-weight')
var fontStyle = $('font-style')

function render(data){
  var p = document.createElement('p')
  p.style.fontSize = fontSize.value + 'px'
  p.style.fontWeight = fontWeight.checked ? 700 : 200
  p.style.fontFamily = fontFamily.value
  p.style.color = color.value
  p.style.fontStyle = fontStyle.checked ? 'italic' : 'normal'
  p.appendChild(document.createTextNode(data))
  return p.outerHTML
}

}())