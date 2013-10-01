var http = require('http')
var url = require('url')

function start(route, handle){
	function oR(req, res){
		var pathname = url.parse(req.url).pathname
		console.log('Request for ' + pathname + ' received.')

		route(handle, pathname, res, req)
	}

	http.createServer(oR).listen(8888)
	console.log('server has started at 8888.')
}
exports.start = start
