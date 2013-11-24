(function(){

var socket = io.connect()

var name
var preName = localStorage.getItem('name')

if(!preName){
  while(!name || name === 'null'){
    name = String(prompt('请输入您的用户名', preName)).replace(/^\s+|\s+$/g, '')
  }
} else {
  name = preName
}

socket.emit('join', name)
localStorage.setItem('name', name)

var $ = function(id){return document.getElementById(id)}
var text = $('text')
var area = $('dialog')
var form = $('form')
var num  = $('num')
var userlist = $('users')
var logout = $('logout')

form.addEventListener('submit', function(e){
  e.preventDefault()
  if(!text.value) return
  socket.emit('message', {msg:render(text.value), time: (new Date).toLocaleString()})
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
  for(var i in users){
    updateData(userlist, i)
  }
  num.innerHTML = Object.keys(users).length
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

logout.addEventListener('click', function(){
  localStorage.clear()
  closeTab()
}, false)

socket.on('multi users', function(){
  alert('您已经登录.')
  closeTab()
})

function closeTab(){
  window.open('','_self','');
  window.close();
}

}())