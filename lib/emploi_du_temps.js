//Code concernant le format pivot du projet Adomy : l'emploi du temps (pdt)
require('./model/intervention.js');

function EmploiDuTemps(intervenant) {
    this.intervenant = intervenant;
    this.interventions = [];

    this.pdt = new Array(7);
    for (var i = 0; i < this.pdt.length; i++) {
        this.pdt[i] = new Array(48);
    }

}


//On veut ajouter x booleens au tableau d'emploi du temps
//jour commence � partir de 0 pour lundi
//heure commence � 0 pour 00h00 et incr�mente par demi heure : 0.5 = 00h30
//on suppose que c'est l'heure d�but de l'�v�nement
//Si intervenant est null, on utilise l'intervenant li� � l'instance de classe
EmploiDuTemps.prototype.ajouter = function (day, time, duration, intervenant, place) {
    try {
        if (intervenant !== null)
            this.interventions.push(new Intervention(day, time, duration, this.intervenant, place));
        else
            this.interventions.push(new Intervention(day, time, duration, intervenant, place));

    } catch (e) {
        console.log(e);
    }
};

EmploiDuTemps.prototype.enlever = function (day, time, duration, place) {
    for (var i = 0; i < this.interventions.length; i++) {

        if (this.interventions[i].day === day && this.interventions[i].time === time && this.interventions[i].duration === duration && this.interventions[i].place === place) {
            this.interventions.splice(i, 1);
            console.log("Entree retiree");
            return;
        }
    }
    console.log("Entree non trouvee");
};

EmploiDuTemps.prototype.generateBooleanArray = function () {
    for (var i = 0; i < this.pdt.length; i++) {
        for (var j = 0; j < this.pdt[i].length; j++) {
            this.pdt[i][j] = false;
        }
    }

    var varNextDay = 0;

    for (entry of this.interventions) {
        for (var i = 0; i < entry.duration; i++) {
            if (entry.time + i < 48)
                this.pdt[entry.day][entry.time + i] = true;
            else {
                this.pdt[entry.day + 1][varNextDay] = true;
                varNextDay++;
            }

        }
    }
};

EmploiDuTemps.prototype.calculerUnion = function (edt2) {

    if (edt2 instanceof EmploiDuTemps) {
        var newEdt = new EmploiDuTemps("Union: " + this.intervenant + " et " + edt2.intervenant);
        for (entry of edt2.interventions) {
            newEdt.ajouter(entry.day, entry.time, entry.duration, entry.intervenant, entry.place);
        }

        for (entry of this.interventions) {
            newEdt.ajouter(entry.day, entry.time, entry.duration, entry.intervenant, entry.place);
        }

        return newEdt;
    }
    else
        console.log("Methode Union : veuillez envoyer un objet du type EmploiDuTemps");
};

EmploiDuTemps.prototype.calculerIntersection = function (edt2) {
    if (edt2 instanceof EmploiDuTemps) {
        var newEdt = new EmploiDuTemps("Intersection: " + this.intervenant + " et " + edt2.intervenant);
        this.generateBooleanArray();
        edt2.generateBooleanArray();

        for (var i = 0; i < this.pdt.length; i++) {
            for (var j = 0; j < this.pdt.length; j++) {

                var debutIntersection = [];
                var finIntersection = [];
                if (this.pdt[i][j] && edt2.pdt[i][j]) {
                    debutIntersection.push(i);
                    debutIntersection.push(j);

                    while (this.pdt[i][j] === true && edt2.pdt[i][j] === true) {
                        if (j < 48)
                            j++;
                        else if (i < 7) {
                            i++;
                            j = 0;
                        }
                        else {
                            break;
                        }

                    }
                    finIntersection.push(i);
                    finIntersection.push(j);
                    newEdt.ajouter(debutIntersection[0], debutIntersection[1], this.differenceDuration(debutIntersection, finIntersection), (this.intervenant + ", " + edt2.intervenant), this.getIntervention(debutIntersection[0], debutIntersection[1]).place + " ," + edt2.getIntervention(debutIntersection[0], debutIntersection[1]).place);
                }
            }
        }

        return newEdt;
    }
    else
        console.log("Methode Union : veuillez envoyer un objet du type EmploiDuTemps");
};

EmploiDuTemps.prototype.differenceDuration = function (durDebut, durFin) {
    var compteur = 0;
    if (durFin[1] < durDebut[1] || durFin[0] != durDebut[0]) {
        while (durFin[1] > 0) {
            durFin[1]--;
            compteur++;
        }
        durFin[1] = this.pdt[0].length;
        durFin[0]--;
    }
    else {
        while (durFin[1] != durDebut[1]) {
            durFin[1]--;
            compteur++;
        }
        return compteur;
    }
};

EmploiDuTemps.prototype.getIntervention = function (day, temps) {


    if (this.pdt[day][temps]) {
        for (entry of this.interventions) {
            if (entry.day === day && entry.time === temps)
                return entry;
        }

        while (this.pdt[day][temps]) {
            if (temps > 0)
                temps--;
            else if (day > 0) {
                day--;
                temps = this.pdt[0].length - 1;
            }
            else {
                break;
            }
        }

        if (temps == 47) {
            temps = 0;
            day++;
        }
        else
            temps++;


        for (entry of this.interventions) {
            if (entry.day === day && entry.time === temps)
                return entry;
        }
        //throw new Error('intervention not found');
    }
    else {
        console.log("getIntervention : pas d'intervention � ce moment");
    }
};

EmploiDuTemps.prototype.afficherBoolean = function () {
    this.generateBooleanArray();
    for (var i = 0; i < this.pdt.length; i++) {
        for (var j = 0; j < this.pdt[i].length; j++) {
            process.stdout.write(this.pdt[i][j] + " ");
        }
        console.log("");
    }
};
module.exports = EmploiDuTemps;

EmploiDuTemps.prototype.exportiCal = function ()
{
  var iCal = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Adomy Corporation//MonProduit v1.0//FR\n";
  iCal = ajoutInterventionICal(this, iCal);
  iCal += "END:VCALENDAR";
  return iCal;
};

var ajoutInterventionICal = function(edt, iCal)
{
    for (entry of this.interventions)
    {
        iCal += "BEGIN:VEVENT\n"
        var min = (entry.time % 2)*30;
        var heure = Math.floor(entry.time / 2);
        iCal += "xxxxxxx" + entry.day + "T" + heure + min + "00Z\nDTEND:";
        var duration = entry.duration;
        var jour = 0;
        while (duration >= 48)
        {
            ++jour;
            duration -= 48;
        }
        var min2 = (duration % 2)*30;
        var heure2 = Math.floor(duration / 2);
        iCal +=  "xxxxxxx" + (entry.day+jour) + "T" + (heure+heure2) + (min+min2) + "00Z\nSUMMARY:A pas dans pivot\n";
        iCal += "DESCRIPTION:" + entry.intervenant + "&pas d'autre détails dans pivot\n"
        iCal += "LOCATION:" + entry.place + "\nEND:VEVENT\n"; 
    }
    return iCal;
};


/*
 EmploiDuTemps.prototype.ajouter = function(x, jour, heure)
 {
 heure *= 2;
 var i = heure;
 var nbJour = 0;
 while (x != 0)
 {
 if (i > 48)
 {
 ++nbJour;
 i = 0;
 }
 this.pdt[jour + nbJour][i] = true;
 ++i;
 --x;
 }
 }


 function enlever(pdt, jour, heure, nbJour)
 //On veut ajouter x booleens au tableau d'emploi du temps
 //jour commence � partir de 0 pour lundi
 //heure commence � 0 pour 00h00 et incr�mente par demi heure : 0.5 = 00h30
 //on suppose que c'est l'heure de d�but de l'�v�nement
 {
 heure *= 2;
 var i = heure;
 var nbJour = 0;
 while (x != 0)
 {
 if (i > 48)
 {
 ++nbJour;
 i = 0;
 }
 pdt[jour + nbJour][i] = false;
 ++i;
 --x;
 }
 return pdt;
 }

 function union(pdt1, pdt2)
 //Fusionne si possible deux emplois du temps et le renvoie
 {
 var pdt_resultat = creer();
 for (i=0; i < 7; ++i)
 {
 for (j=0; j < 48; ++j)
 {
 if (pdt1[i][j])
 {
 if (pdt2[i][j])
 console.log("Doublon d�tect�..." + i + "jours" + j/2 + "heures");
 else
 pdt_resultat[i][j] = pdt1[i][j];
 }
 else if (pdt2[i][j])
 {
 if (pdt1[i][j])
 console.log("Doublon d�tect�..." + i + "jours" + j/2 + "heures");
 else
 pdt_resultat[i][j] = pdt2[i][j];
 }
 }
 }
 return pdt_resultat;
 }

 function intersection(pdt1, pdt2)
 //Trouve si possible les �v�nements en commun de deux emplois du temps et le renvoie
 {
 var pdt_resultat = creer();
 for (i=0; i < 7; ++i)
 {
 for (j=0; j < 48; ++j)
 {
 if (pdt1[i][j])
 {
 if (pdt2[i][j])
 pdt_resultat[i][j] = pdt1[i][j];
 }
 else if (pdt2[i][j])
 {
 if (pdt1[i][j])
 pdt_resultat[i][j] = pdt2[i][j];
 }
 }
 }
 return pdt_resultat;
 }

 function complementaire(pdt)
 //Renvoie l'inverse de l'emploi du temps
 {
 var pdt_resultat = creer();
 for (i=0; i < 7; ++i)
 {
 for (j=0; j < 48; ++j)
 pdt_resultat[i][j] = !pdt[i][j];
 }
 return pdt_resultat;
 }

 function compter(pdt)
 //Renvoie le nombre d'�v�nements d'un emploi du temps
 {
 var compteur = 0;
 for (i=0; i < 7; ++i)
 {
 for (j=0; j < 48; ++j)
 {
 if (pdt[i][j])
 ++compteur;
 }
 }
 return compteur;
 }
 */
