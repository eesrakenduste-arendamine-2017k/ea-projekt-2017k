# Eesrakenduste arendamine 2017k – projekt

## Tähtaeg 

Valitud eksamipäev
05.13.2017

## Liikmete arv
Võib teha üksi või kahekesi (maksimaalselt 3)

Üksi
**Juhul kui tehakse mitmekesi, peab olema näha GitHub'is, kes ja mida on kirjutanud. Kui ei ole näha, kes midagi kirjutanud on, tööd ei arvesta! Kui ei tea kuidas seda teha, küsi!**

## Tööjuhend
1. Üks fork'ib endale käesoleva repositooriumi ning annab vajadusele kirjutamisõiguse/ligipääsu
1. Tee kohe Pull request
1. Muuda repositooriumi `README.md faili` vastavalt nõutele
1. Tee valmis korralik veebirakendus

### Nõuded

1. **README.md sisaldab:**
    * suurelt projekti nime;
    * kes teeb;
    * eesmärki (3-4 lauset, mis probleemi rakendus lahendab);
    * funktsionaalsuse loetelu prioriteedi järjekorras, nt
        * v0.1 Saab teha kasutaja ja sisselogida
        * v0.2 Saab lisada ...
        * ...
    * andmete liikumise skeem loetava pildina (mis lehed ja mis andmeid ning mis lehel käideldakse);

2. **Veebirakenduse nõuded:**
    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `ServiceWorker`it;
    * andmeid talletatakse lisaks kohalikule (nt localStorage) ka serveripool (soovitatavalt andmebaasi või faili) – AJAX + serveripoolel nt PHP, Java, Node;
    * Mugavalt kasutatav ka mobiilselt seadmelt;
    * muutujad/tabelid on inglise keeles;
    * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
    * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul (ingl _minified_);

3. **Funktsionaalsus**
    * juhul kui algoritmiline keerukus on piisav siis kõiki nõudeid ei ole vaja täita – ainult eelneval kokkuleppel õppjõuga!

	1. Tegemist on appiga, millega saab arvutada kaloreid ning oma kehamassiindeksi.
	
	BMI: Kehakaalu ja pikkuse suhe
	Kategooria - BMI vahemik
	Alakaal	16 - 18.9
	Normaalkaal	19 - 25
	Ülekaal	25.1 - 30
	Rasvumine	30.1 - 35
	
	Source: http://www.kalkulaator.ee/et/kehamassiindeks
	
	Kalori kalkulaator näitab päevas kaotatud kaloreid ning palju peab teatuid toitaineid sööma, et püsida samas kaalus.
	
	Kasutatud/laenatud kood, kellele kuuluvad kõik autoriõigused:
	
	1. https://www.hscripts.com/scripts/JavaScript/calorie-calculator.php
	2. https://stackoverflow.com/questions/21698044/basic-bmi-calculator-html-javascript
	
	