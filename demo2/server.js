
var http = require('http')
var url = require('url')

function start(route, handler){

	http.createServer(onRequest).listen(3000)

	function onRequest(request, response){

		var pathname = url.parse(request.url).pathname

		route(pathname, handler)

		response.writeHead(200, {'Content-Type': 'text/plain'})
		response.write('hello node.')
		response.end();
	}

}
exports.start = start