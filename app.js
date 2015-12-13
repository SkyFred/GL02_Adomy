

if(require.main === module){
	// We're running as a cli app
	var csv = require('./lib/csv');
	var ical = require('./lib/ical_Parser');
	var EmploiDuTemps = require('./lib/emploi_du_temps');



}else{
	// We're being used as a library !
	// Then we should expose our API
	// module.exports = ...;
}//test
