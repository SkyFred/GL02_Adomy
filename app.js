if(require.main === module){
	// We're running as a cli app
	var csv = require('./lib/csv');
	var ical = require('./lib/ical_Parser');
	var EmploiDuTemps = require('./lib/emploi_du_temps');
var command = process.argv.slice(2);
var command1 = command[0];
var cheminDuFichier =command[1];

var argument = command[1];
var argument2 = command[2];
console.log("test");

}else{
	// We're being used as a library !
	// Then we should expose our API
	// module.exports = ...;
}//test

//EXECUTION DES COMMANDES
switch(command1){ // ici on gère l'exécution de chacune des commandes

  case "convertCsvToIcal" :

	try{
		var edtSource = csv.parseFile(argument); // il parse le fichier reçu en argument qu'il soit un iCal ou un Csv . Il le convertit donc en format pivot
console.log("a bien été importé");
		edtSource.exportiCal(); // il crée sur le répertoire notre emploi du temps  au format pivot converti en format iCal
		console.log("Votre fichier a bien été converti");
	}
	catch(e){
		console.log("Le fichier entré est incorrect.");
	}
  break;
case "convertIcalToCsv":
	try {
		var edtSource = ical.parseFile(argument); // il parse le fichier reçu en argument qu'il soit un iCal ou un Csv . Il le convertit donc en format pivot
		edtSource.exportCsv(); //il crée sur le répertoire notre emploi du temps au format pivot converti en format csv
	console.log("a bien été importé");}
	catch(e){
		console.log("Le fichier entré est incorrect.");
			}
			break ;

case "union" :
  var edtSource = ical.parseFile(argument); //import du premier emploi du temps
  var edtSource2 = ical.parseFile(argument2);
  var edtSortie = edtSource.calculerUnion(edtSource2);
  edtSortie.exportCsv();
  break;

case "intersection" :
    var edtSource = ical.parseFile(argument); //import du premier emploi du temps
    var edtSource2 = ical.parseFile(argument2);
    var edtSortie = edtSource.calculerIntersection(edtSource2);
    edtSortie.exportCsv();
	break;

  case "calculVolumeHoraire" :
  var edtSource = ical.parseFile(argument);
  console.log("Import reussi");
  var edtSortie = edtSource.calculerVolumeHoraire();
  console.log("le volume horaire est de " + edtSortie);

  break;

   case "nombreInterventions" :
  var edtSource = ical.parseFile(argument);
  console.log("Import reussi");
  var edtSortie = edtSource.calculerNombreIntervention();
  console.log("le nombre d'interventions est de "+ edtSortie);

  break;


  case "complementaire" :
  var edtSource = ical.parseFile(argument); //parseFile() prend en argument le chemin absolu du fichier à parser
  var edtSortie = edtSource.calculerComplementaire(); //toutes les fonctions du style EmploiDuTemps.prototype sont des méthodes de la classe EmploiDuTemps.
  edtSortie.exportCsv(); // elles s'utilisent donc sans argument, mais s'utilisent comme ceci : nomObjet.nomMéthode()
  break;


  default :
  }
