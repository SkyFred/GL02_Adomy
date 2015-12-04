//Code concernant le format pivot du projet Adomy : l'emploi du temps

function creer()
//L'emploi du temps comme défini dans le cahier des charges
//est un tableau de 336 booleens(7*48).
{
	var pdt = new Array(7);
	for (i=0; i < 7; ++i)
		pdt[i] = new Array(48);
	return pdt;
}

function ajouter(pdt, x, jour, heure)
//On veut ajouter x booleens au tableau d'emploi du temps
//jour commence à partir de 0 pour lundi
//heure commence à 0 pour 00h00 et incrémente par demi heure : 0.5 = 00h30
//on suppose que c'est l'heure début de l'événement
{
	heure *= 2;
	for (i=0; i < x; ++i)
		pdt[jour][heure + i] = true;
	return pdt;
}

function enlever(pdt, x, jour, heure)
//On veut ajouter x booleens au tableau d'emploi du temps
//jour commence à partir de 0 pour lundi
//heure commence à 0 pour 00h00 et incrémente par demi heure : 0.5 = 00h30
//on suppose que c'est l'heure de début de l'événement
{
	heure *= 2;
	for (i=0; i < x; ++i)
		pdt[jour][heure + i] = false;
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
					console.log("Doublon détecté...");
				else
					pdt_resultat[i][j] = pdt1[i][j];
			}
			else if (pdt2[i][j])
			{
				if (pdt1[i][j])
					console.log("Doublon détecté...");
				else
					pdt_resultat[i][j] = pdt2[i][j];
			}
		}
	}
	return pdt_resultat;
}

function intersection(pdt1, pdt2)
//Trouve si possible les événements en commun de deux emplois du temps et le renvoie
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
//Renvoie le nombre d'événements d'un emploi du temps
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