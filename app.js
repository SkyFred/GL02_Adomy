if(require.main === module){
	// We're running as a cli app
	var csv = require('./lib/csv');
	console.log(csv.parseFile(__dirname + '/test/data/sample.csv'));
}else{
	// We're being used as a library !
	// Then we should expose our API
	// module.exports = ...;
}//test
