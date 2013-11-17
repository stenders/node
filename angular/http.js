var http = require('http')

var option = {
  host: 'shapeshed.com',
  port: 80,
  path: '/'
}

http.get(option,function(res){
  if(res.statusCode == 200){
    console.log('the site is up.')
    console.log(res.headers.server)
  } else {
    console.log('the site is down.')
  }
}).on('err', function(e){
  console.log('there was an error : ' + e.message)
})