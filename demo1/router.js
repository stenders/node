function route(handle, path, res, req){
	console.log('about to route a request for ' + path)

	if(typeof handle[path] === 'function'){
		handle[path](res, req)
	} else {
		console.log('no request handler found for ' + path)
		res.writeHead(404, {'Content-Type': 'text/plain'})
		res.write('404 not found.')
		res.end()
	}
}

exports.route = route