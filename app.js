

if(require.main === module){
	// We're running as a cli app
	
	/*var csv = require('./lib/csv');
	console.log(csv.parseFile(__dirname + '/test/data/sample.csv'));*/

	var ical = require('./lib/ical_Parser');
	//Sconsole.log(ical.parseFile(__dirname + '/test/data/sample.iCal'));

    var EmploiDuTemps = require('./lib/emploi_du_temps');
	var edt = new EmploiDuTemps("Michel");

	var edt2 = new EmploiDuTemps("Lucas");

	edt2.ajouter(1,46,5,null,"Jardiland");
	edt.ajouter(2,0,10,null,"UTT");
	edt2.ajouter(2,5,10,null,"Jardiniere");

	var edtUnion = edt.calculerIntersection(edt2);

	edt2.afficherBoolean();




}else{
	// We're being used as a library !
	// Then we should expose our API
	// module.exports = ...;
}//test
