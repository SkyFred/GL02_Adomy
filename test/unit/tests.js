var fs = require('fs'), path = require('path');

function walk(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(path.basename(filePath));
        }
    });
}

// We find every test we are able to run, and we run it!
walk(__dirname, function(file){
	if(file == 'tests.js')
		return;
	console.time("Duration");
	console.log("Running the '" + file + "' test file");
	require(__dirname + path.sep + file);
	console.timeEnd("Duration");
	console.log(); // empty line
});