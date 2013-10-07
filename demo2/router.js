
var route = function(pathname, handler, args){
	console.log('we are visiting ' + pathname)

	var handle = handler[pathname.slice(1)]
	if(typeof handle === 'function'){
		handle(args)
	} else {
		console.log('no request handler for '+ pathname)
	}

}

exports.route = route