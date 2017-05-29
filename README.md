# Eesrakenduste arendamine 2017k – Kõige soojema veeallika rakendus


## Liikmed

Kirke Gross
Kristel Roosimaa

## Tööjuhend
1. Üks fork'ib endale käesoleva repositooriumi ning annab vajadusele kirjutamisõiguse/ligipääsu
1. Tee kohe Pull request
1. Muuda repositooriumi `README.md faili` vastavalt nõutele
1. Tee valmis korralik veebirakendus

### Eesmärgid:

  *Veebirakendus on mõeldud leidma kõige soojemat veeallikat kuskil 50km raadiuses.
  *Ideaalne suve perioodiks, kui soov ujuma minna aga ei tea kus on kõige soojem ja puhtaim vesi.
  *Rakendus teeb mugavaks leidmaks sobiva veekogu.

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
