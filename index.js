var Promise = require('any-promise');
var fs = require('fs-promise');
var flatten = require('lodash.flatten');
var pathJoin = require('path').join;
var PATH = process.env.PATH;

function getPaths(path) {
	return path.split(':');
}

module.exports = function(path) {
	return Promise.all(getPaths(path || PATH).map(function(p) {
		return fs.readdir(p).then(function(execs) {
			return execs.map(function(exec) {
				return pathJoin(p, exec);
			});
		});
	})).then(flatten);
};
