# Eesrakenduste arendamine 2017k – projekt

## Tähtaeg:
  05.06

  POOMISMÄNG veebirakendus

  viide hangman koodi algsele põhjale: https://codepen.io/anon/pen/WjBOaX

* Tõnu Trubetsky, Lauri Valma, Brigitta Kannel

* klassikaline poomismäng:
  1.mängija peab tähestikust valides arvama ära mis on ette antud sõnade kombinatsioon.
  2.vihjeks on antud kategooria ja lisaks saab kasutada ka lisa vihje kuvamiseks nuppu.
  3.valesti valitud tähtede puhul hakkab kanvasele kriipsujukut üles pooma.

* funktsionaalsuse loetelu prioriteedi järjekorras:
    * v0.1 sõnad ja kategooriad eesti keeles
    * v0.2 salvestab skoori andmebaasi ja edetabelisse
    * v0.3 esileht kus saab mängija nime sisestada ja kategooria valida, edetabelit kuvada.

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
