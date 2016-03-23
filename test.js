var expect = require('@quarterto/chai');
var pathExecutables = require('./');
var path = require('path');

var fixtures = path.resolve('fixtures');

describe('path executables', function() {
	it('should contain things in the fixtures', function(done) {
		pathExecutables(path.join(fixtures, 'path1')).then(function(exec) {
			expect(exec).to.contain.members([
				path.join(fixtures, 'path1', 'a'),
				path.join(fixtures, 'path1', 'b')
			]);
			done();
		}).catch(done);
	});

	it('should work with colon-separated paths', function(done) {
		pathExecutables([
			path.join(fixtures, 'path1'),
			path.join(fixtures, 'path2'),
		].join(':')).then(function(exec) {
			expect(exec).to.contain.members([
				path.join(fixtures, 'path1', 'a'),
				path.join(fixtures, 'path1', 'b'),
				path.join(fixtures, 'path2', 'c'),
				path.join(fixtures, 'path2', 'd'),
			]);
			done();
		}).catch(done);
	});

	xit('should not contain non-executables', function(done) {
		pathExecutables(path.join(fixtures, 'path3')).then(function(exec) {
			expect(exec).to.contain(path.join(fixtures, 'path3', 'e'));
			expect(exec).not.to.contain(path.join(fixtures, 'path3', 'f'));
			done();
		}).catch(done);
	});
});
