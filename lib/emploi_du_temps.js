//Code concernant le format pivot du projet Adomy : l'emploi du temps (pdt)

function creer()
//L'emploi du temps comme défini dans le cahier des charges
//est un tableau de 336 booleens(7jours*48demi-heure).
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
	var i = heure;
	var nbJour = 0;
	while (x != 0)
	{
		if (i > 48)
		{
			++nbJour;
			i = 0;
		}
		pdt[jour + nbJour][i] = true;	
		++i;
		--x;
	}
	return pdt;
}

function enlever(pdt, jour, heure, nbJour = 0)
//On veut ajouter x booleens au tableau d'emploi du temps
//jour commence à partir de 0 pour lundi
//heure commence à 0 pour 00h00 et incrémente par demi heure : 0.5 = 00h30
//on suppose que c'est l'heure de début de l'événement
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
					console.log("Doublon détecté..." + i + "jours" + j/2 + "heures");
				else
					pdt_resultat[i][j] = pdt1[i][j];
			}
			else if (pdt2[i][j])
			{
				if (pdt1[i][j])
					console.log("Doublon détecté..." + i + "jours" + j/2 + "heures");
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