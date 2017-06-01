# IRL Counter-Strike telefonidega

##Osalised 
1. miks
    *Mattias Põldaru
    *Leevi Põldaru
    *Rando Tomingas

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Eesmärk
Simuleerida maastikumänguna arvutimängu Counter-Strike.
Kasutaja saab registreerida kas veebiliidesed, või kui ilma internetita mängija, siis mängu baasis.
Registreeride või kui mängija pihta saab, tuleb baasist läbi käia, koodiga ennast vabastada ja prinditakse välja paber, kus on peal kood tabamiseks (tuleb riputada selja peale).

## Failid
https://github.com/mahfiaz/spotter_irl



## Tähtaeg 

Valitud eksamipäev

## Liikmete arv
Võib teha üksi või kahekesi (maksimaalselt 3)

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
