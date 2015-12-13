# GL02_Adomy [![Build Status](https://secure.travis-ci.org/PunKeel/GL02_Adomy.svg?branch=master)](https://travis-ci.org/PunKeel/GL02_Adomy)

<p>Ce repo contient l'implémentation des spécifications intitulées 'flying_muffins_cc_1A.pdf', il vise à répondre au besoin de flexibilité dans la gestion des emplois du temps de l'association Adomy.</P>

##Modifications cahier des charges

<p>Selon le cahier des charges, le format pivot étaient un tableau de booléen de taille 7*48, nous avons gardé cette structure et l'avons l'enrichit afin de pouvoir répondre aux exigences demandées. Le format pivot est une classe portant le nom "EmploiDuTemps", elle contient un attribut "intervenant", un tableau appelé "interventions" et le tableau de booléens de taille 7*48 appelé "pdt".</br> Cette modification a été effectuée car un tableau de booléen n'apporte pas assez d'informations en lui-même concernant le détail des interventions et sur l'identité des intervenants et ces informations sont pourtant nécessaires afin de répondre aux spécifications fonctionnelles formulées dans le cahier des charges.</p>

##Utilisation

<p>Pour utiliser cette librairie, l'ensemble de l'API est disponible dans le fichier "app.js", elle rassemble les dépendances nécessaire au bon fonctionnement de la librairie. L'implémentation du format pivot se situe dans le fichier "/lib/emploi_du_temps.js", il contient les différentes opérations que l'on peut effectuer sur le format développé.</p>

<p>Pour manipuler une variable du type "EmploiDutemps", vous devez à l'instanciation envoyer un paramètre "intervenant" au constructeur, cela permet de définir à quel intervenant cet emploi du temps est lié, l'attribut intervenant pourra aussi contenir un préfixe en fonction de la nature de l'emplois du temps, par exemple, s'il s'agit du complémentaire de l'emplois du temps, son attribut sera sous la forme "Complémentaire de "intervenant"".</br>Afin de manipuler ce type, les fonctions "ajouter" et "enlever" pour contrôler le nombre d'interventions de cet emplois du temps sont définies comme dans le cahier des charges.</br>Vous pouvez de plus visualiser le tableau de booléen grâce à la fonction "afficherBoolean()"</p>

<p>Fonctions disponibles répondant aux spécification du cahier des charges:</p>
<ul>

	<li>SPEC_01, fonctions "parseFile(fileToParse)" du fichier "/lib/csv.js" ou "/lib/ical_Parser.js"</li>
	<li>SPEC_02, fonction "parseFile(fileToParse)" du fichier "/lib/ical_Parser.js", le paramètre représente le chemin absolu du fichier à parser</li>
	<li>SPEC_03, fonction "parseFile(fileToParse)" du fichier "/lib/csv.js", le paramètre représente le chemin absolu du fichier à parser</li>
	<li>SPEC_04, fonction "calculerIntersection(edt : EmploiDuTemps)" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont les interventions corespond à l'intersection de celles de l'objet courant et de l'objet EmploiDuTemps passé en paramètre</li>
	<li>SPEC_05, fonction "calculerUnion(edt : EmploiDuTemps)" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont les interventions corespond à l'union de celles de l'objet courant et de l'objet EmploiDuTemps passé en paramètre</li>
	<li>SPEC_06, fonction "calculerComplementaire()" du fichier "/lib/emploi_du_temps.js", elle retourne un nouvel objet du type EmploiDuTemps dont le tableau de booleen corespondant aux disponibilité de l'intervenant est inversé</li>
	<li>SPEC_07, fonction "exportiCal()" du fichier "/lib/emploi_du_temps.js", elle génère un nouveau fichier à la racine du projet dont le nom est sour le format "intervevant.ics". Ce fichier corespond à la conversion du format pivot au format .ics</li>
	<li>SPEC_08, fonction "exportCsv()" du fichier "/lib/emploi_du_temps.js", elle génère un nouveau fichier à la racine du projet dont le nom est sour le format "intervevant.csv". Ce fichier corespond à la conversion du format pivot au format .csv</li>
	<li>SPEC_09, fonction "calculerVolumeHoraire()" du fichier "/lib/emploi_du_temps.js", elle retourne une variable dont la valeur corespond au volume horaire de l'objet EmploiDuTemps courant</li>
	<li>SPEC_10, fonction "calculerNombreIntervention()" du fichier "/lib/emploi_du_temps.js", elle retourne une variable dont la valeur corespond au nombre d'interventions de l'objet EmploiDuTemps courant</li>
</ul>
##Parsing

Afin d'importer des données existante, que se soit au format ".ics" ou ".csv", vous avez accès aux fichiers "/lib/csv.js" afin de parser et convertir les données contenues du format ".csv" au format établi dans "/lib/emploi_du_temps.js" et au fichier "/lib/ical_Parser.js" afin de parser et convertir les données contenues du format ".ics" au format établi dans "/lib/emploi_du_temps.js".</br>Pour utiliser ces fichiers, importez tout d'abord celui que vous souhaitez exploiter avec 
le mot clé "require" puis appelez la fonction "parseFile(fileToParse)" du fichier, fileToParse étant le chemin du fichier que vous voulez parser, il suffit de stocker le résultat de cette fonction dans une variable, celle-ci pourra être utiliser comme un objet du type "EmploiDuTemps".

## Contributing
Ajout de paramètres pour les fonctions ajouter et enlever pour le fichier pivot.

`app.js` contains the publicly available library (the API), `lib/` contains everything we'll use (iCal parser, ...) that should be kept private.

`test/` contains the tests, and every file named `test/unit/*.js` will be automagically discovered and run.

To run the tests suite, just run `npm test`.


## License
MIT © GL02_Adomy team
