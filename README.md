# GL02_Adomy [![Build Status](https://secure.travis-ci.org/PunKeel/GL02_Adomy.svg?branch=master)](https://travis-ci.org/PunKeel/GL02_Adomy)

##Utilisation

Ce repo contient l'implémentation des spécifications intitulées "flying_muffins_cc_1A.pdf", il vise à répondre au besoin de flexibilité dans la gestion des emplois du temps de l'association Adomy.

Pour utiliser cette librairie, l'ensemble de l'API est disponible dans le fichier "app.js", elle rassemble les dépendances nécessaire au bon fonctionnement de la librairie. L'implémentation du format pivor se situe dans le fichier "/lib/emploi_du_temps.js", il contient les différentes opérations que l'on peut effectuer sur le format définit.

Fonctions disponibles répondant aux spécification du cahier des charges:
	- SPEC_01, fonctions "parseFile" du fichier "/lib/csv.js" ou "/lib/ical_Parser.js"
	- SPEC_02, fonction "parseFile(fileToParse)" du fichier "/lib/ical_Parser.js", le paramètre représente le chemin absolu du fichier à parser
	- SPEC_03, fonction "parseFile(fileToParse)" du fichier "/lib/csv.js", le paramètre représente le chemin absolu du fichier à parser
	- SPEC_04, fonction "calculerIntersection(edt : EmploiDuTemps)" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont les interventions corespond à l'intersection de celles de l'objet courant et de l'objet EmploiDuTemps passé en paramètre
	- SPEC_05, fonction "calculerUnion(edt : EmploiDuTemps)" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont les interventions corespond à l'union de celles de l'objet courant et de l'objet EmploiDuTemps passé en paramètre
	- SPEC_06, fonction "calculerComplementaire()" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont le tableau de booleen corespondant aux disponibilité de l'intervenant est inversé
	- SPEC_07, fonction "exportiCal()" du fichier "/lib/emploi_du_temps.js", elle génère un nouveau fichier à la racine du projet dont le nom est sour le format "intervevant.ics". Ce fichier corespond à la conversion du format pivot au format .ics
	- SPEC_08, fonction "exportCsv()" du fichier "/lib/emploi_du_temps.js", elle génère un nouveau fichier à la racine du projet dont le nom est sour le format "intervevant.csv". Ce fichier corespond à la conversion du format pivot au format .csv
	- SPEC_09, fonction "calculerVolumeHoraire()" du fichier "/lib/emploi_du_temps.js", elle retourne une variable dont la valeur corespond au volume horaire de l'objet EmploiDuTemps courant
	- SPEC_10, fonction "calculerNombreIntervention()" du fichier "/lib/emploi_du_temps.js", elle retourne une variable dont la valeur corespond au nombre d'interventions de l'objet EmploiDuTemps courant

##Parsing

Afin d'importer des données existante, que se soit au format ".ics" ou ".csv", vous avez accès aux fichiers "/lib/csv.js" afin de parser et convertir les données contenues du format ".csv" au format établi dans "/lib/emploi_du_temps.js" et au fichier "/lib/ical_Parser.js" afin de parser et convertir les données contenues du format ".ics" au format établi dans "/lib/emploi_du_temps.js". Pour utiliser ces fichiers, importez tout d'abord celui que vous souhaitez exploiter avec 
le mot clé "require" puis appelez la fonction "parseFile(fileToParse)" du fichier, fileToParse étant le chemin du fichier que vous voulez parser, il suffit de stocker le résultat de cette fonction dans une variable, celle-ci pourra être utiliser comme un objet du type "EmploiDuTemps".

## Contributing
Ajout de paramètres pour les fonctions ajouter et enlever pour le fichier pivot.

`app.js` contains the publicly available library (the API), `lib/` contains everything we'll use (iCal parser, ...) that should be kept private.

`test/` contains the tests, and every file named `test/unit/*.js` will be automagically discovered and run.

To run the tests suite, just run `npm test`.


## License
MIT © GL02_Adomy team
