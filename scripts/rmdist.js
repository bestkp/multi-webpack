var rimraf = require('rimraf');
var path = require('path');
var fs = require('fs');
rimraf(path.resolve(__dirname, '../dist'), fs, function cb() {
	console.log('dist目录已清空');
});
