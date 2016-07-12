var Promise = require('any-promise');
var fs = require('fs-promise');
var flatten = require('lodash.flatten');
var filterPromise = require('@quarterto/filter-promise');
var executable = require('executable');
var pathJoin = require('path').join;
var PATH = process.env.PATH;

function getPaths(path) {
	return path.split(':');
}

module.exports = function(path) {
	return Promise.all(getPaths(path || PATH).map(function(p) {
		return fs.readdir(p).then(function(execs) {
			return filterPromise(execs.map(function(exec) {
				return pathJoin(p, exec);
			}), executable);
		});
	})).then(flatten);
};
