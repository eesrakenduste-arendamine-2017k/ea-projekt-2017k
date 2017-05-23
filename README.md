#Tegemist on Tic-Tac-Toe mänguga.
1. Registreeri kasutaja
2. Kasutaja talletatakse MongoDb kausta
3.Logi sisse 
4.Alusta mängimist arvuti vastu


Viited:

passport.js ning user.js

https://stackoverflow.com/questions/34237897/nodejs-passport-login

mängu kood:

http://www.codeseek.co/MutantSpore/tic-tac-toe-jWWYLo

Asub play.ejs


	

Töö tegijad Kert Aavik ja Lauri Lainelo
Õpetus:

1.Lae alla Node.js
2.Lae alla MongoDb
3.Ava Command Prompt
	-Liigu kausta , kus asub mäng.
	-võib kasutada pushd asukoht
	-Kirjuta Node server
4.Ava teine Command Prompt 
	-Liigu kausta kuhu installisid MongoDb , ava see kaust liigu edasi - server-versioon
	(peaks olema 3.4)-Bin
	ehk siis directori peaks olema (C:\Program Files\MongoDB\Server\3.4\bin)
	-Kirjuta mongod
5.Ava browser liigu http://localhost:3000 , porti saab ka muuta server.js 94 real, kui tekib probleeme
6.Registreeri kasutaja 
7.Mängi mängu ja vaata statistikat

Edu!

NB! Kui mongodb ei tööta siis ilmselt ei ole ta saanud tekitada kausta, kuhu ta salvestab andmeid.
Selleks mine C: - tekita folder data - sinna sisse tekita folder db