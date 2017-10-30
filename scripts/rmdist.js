var fs = require('fs');
var rimraf = require('rimraf');
var dirVars = require('../config/dir.config');
rimraf(dirVars.buildDir, fs, function cb() {
	console.log('build目录已清空');
});
