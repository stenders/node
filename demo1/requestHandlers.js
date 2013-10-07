var querystring = require('querystring')
var fs = require('fs')
var formidable = require('formidable')


function start(res){
	console.log('request handler "start" was called.')

	var body = '<html>' + 
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" method="post">' +
		' <input type="file" name="upload"> ' +
		'<input type="submit" value="Submit file" />' +
		'</form>' +
	    '</body>'+
    	'</html>'
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.write(body)
    res.end()
}


function upload(res, req){
	console.log('request handler "upload" was called.')


	var form = new formidable.IncomingForm()

	console.log('about to parse')

	form.parse(req, function(err, fields, files){
		console.log('parse done.')
		fs.renameSync(files.upload.path, 'tmp/test.png')
		res.writeHead(200, {'Content-Type': 'text/html'})
		res.write('<h1 style="color:red;"> received image:</h1>')
		res.write('<img src="/show" />' )
		res.end()
	})
}


function show(res){
	console.log('request handler "show" was called.')
	fs.readFile('./tmp/test.png', 'binary', function(err, file){
		if(err){
			res.writeHead(500, {'Content-Type': 'text/plain'})
			res.write(err)
			res.end()
		}
		else {
			res.writeHead(200, {'Content-Type': 'image/png'})
			res.write(file, 'binary')
			res.end()
		}
	})
}

exports.show = show
exports.start = start
exports.upload = upload