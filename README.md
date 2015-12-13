# GL02_Adomy [![Build Status](https://secure.travis-ci.org/PunKeel/GL02_Adomy.svg?branch=master)](https://travis-ci.org/PunKeel/GL02_Adomy)

#Utilisation

Ce repo contient l'implémentation des spécifications intitulées "flying_muffins_cc_1A.pdf", il vise à répondre au besoin de flexibilité dans la gestion des emplois du temps de l'association Adomy.
Pour utiliser cette librairie, la dépendance principale se situe dans le fichier "/lib/emploi_du_temps.js", il contient l'implémentation du format pivot et les différentes opérations que l'on peut effectuer dessus.

#Parsing

Afin d'importer des données existante, que se soit au format ".ics" ou ".csv", vous avez accès aux fichiers "/lib/csv.js" afin de parser et convertir les données contenues du format ".csv" au format établi dans "/lib/emploi_du_temps.js" et au fichier "/lib/ical_Parser.js" afin de parser et convertir les données contenues du format ".ics" au format établi dans "/lib/emploi_du_temps.js". Pour utiliser ces fichiers, importez tout d'abord celui que vous souhaitez exploiter avec 
le mot clé "require" puis appelez la fonction "parseFile(fileToParse)" du fichier, fileToParse étant le chemin du fichier que vous voulez parser, il suffit de stocker le résultat de cette fonction dans une variable, celle-ci pourra être utiliser comme un objet du type "EmploiDuTemps".



# Contributing
Ajout de paramètres pour les fonctions ajouter et enlever pour le fichier pivot.

`app.js` contains the publicly available library (the API), `lib/` contains everything we'll use (iCal parser, ...) that should be kept private.

`test/` contains the tests, and every file named `test/unit/*.js` will be automagically discovered and run.

To run the tests suite, just run `npm test`.


## License
MIT © GL02_Adomy team
