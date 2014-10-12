var PATH = process.env.PATH;
var fs = require('fs');
var asyncFlatMap = require('async-flat-map');

function getPaths(path) {
	return path.split(':');
}

var listAll = asyncFlatMap(fs.readdir);

module.exports = listAll(getPaths(PATH));
