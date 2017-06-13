var player = {
	"Name":user,
	"pHead":0,
	"pLeftHand":0,
	"pChest":0,
	"pRightHand":0,
	"pLeftLeg":0,
	"pRightLeg":0,
	"won":0,
	"lost":0
};

var enemy = {
	"Name":"",
	"eHead":0,
	"eLeftHand":0,
	"eChest":0,
	"eRightHand":0,
	"eLeftLeg":0,
	"eRightLeg":0,
	"won":0,
	"lost":0
};

var playerString = {};
var stringToSave = {};
var allPlayers =[];

var colors = ["#ffc0cb", "#b3b3b3", "#966d4f"];// roosa, hõbedane, pruun
var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];
var enemyCreatureParts = document.getElementsByClassName("enemyCreature");
var playerPoints = 0;
var enemyPoints = 0;

var alreadyPlayed = false;

window.onload = function(){

// window.addEventListener("click", function(e) {
// console.log(e);
// });

	loadServerFn();

	setTimeout(function() {
		loadPlayer();
	}, 100);


	pHead.addEventListener("click", function() {changeValue(colors, pHead, "pHead");} );
	pHead.addEventListener("mouseover", function() {pointer(pHead);} );

	pLeftHand.addEventListener("click", function() {changeValue(colors, pLeftHand, "pLeftHand");} );
	pLeftHand.addEventListener("mouseover", function() {pointer(pLeftHand);} );

	pChest.addEventListener("click", function() {changeValue(colors, pChest, "pChest");} );
	pChest.addEventListener("mouseover", function() {pointer(pChest);} );

	pRightHand.addEventListener("click", function() {changeValue(colors, pRightHand, "pRightHand");} );
	pRightHand.addEventListener("mouseover", function() {pointer(pRightHand);} );

	pLeftLeg.addEventListener("click", function() {changeValue(colors, pLeftLeg, "pLeftLeg");} );
	pLeftLeg.addEventListener("mouseover", function() {pointer(pLeftLeg);} );

	pRightLeg.addEventListener("click", function() {changeValue(colors, pRightLeg, "pRightLeg");} );
	pRightLeg.addEventListener("mouseover", function() {pointer(pRightLeg);} );

	confirmer.addEventListener("click", function() {confirmMonster();} );
	confirmer.addEventListener("mouseover", function() {pointer(confirmer);} );

	search.addEventListener("click", function() {chooseEnemy();} );
	random.addEventListener("click", function() {randomEnemy();} );

	playPvP.addEventListener("click", function() {startPlay();} );
	playPvP.addEventListener("mouseover", function() {pointer(playPvP);} );

};

function changeValue(list, object, type) {
	for(var i=0; i<list.length; i++);
	player[type] += 1;

	if (player[type] == list.length+1) {
		player[type] = 1;
	}
	object.style.backgroundColor = list[player[type]-1];
}

function pointer(object) {
	object.style.cursor = "pointer";
}

function confirmMonster() {
	if(checkMonster(player, pTypes)==1) {

		if(checkMonster(enemy, eTypes)===0) {
			console.log("Will save now");
			saveServerFn();
			alreadyPlayed = false;
		} else {
			console.log("Can't save while in combat");
		}


	} else {
		console.log("Monster not ready to save!");
	}
}


function checkMonster(subject, list) {
	var ready = 1;
	for(var i=0; i<list.length; i++) {
		if(subject[list[i]]===0){
			ready = 0;
		}
	}
	return ready;
}



function loadPlayer() {
	for(var p=0; p<allPlayers.length; p++){
		if(allPlayers[p].Name==player.Name){

			console.log(player.Name);
			player.Name = allPlayers[p].Name;
			player.pHead = allPlayers[p].pHead;
			document.getElementById('pHead').style.backgroundColor = colors[player.pHead-1];
			player.pLeftHand = allPlayers[p].pLeftHand;
			document.getElementById('pLeftHand').style.backgroundColor = colors[player.pLeftHand-1];
			player.pChest = allPlayers[p].pChest;
			document.getElementById('pChest').style.backgroundColor = colors[player.pChest-1];
			player.pRightHand = allPlayers[p].pRightHand;
			document.getElementById('pRightHand').style.backgroundColor = colors[player.pRightHand-1];
			player.pLeftLeg = allPlayers[p].pLeftLeg;
			document.getElementById('pLeftLeg').style.backgroundColor = colors[player.pLeftLeg-1];
			player.pRightLeg = allPlayers[p].pRightLeg;
			document.getElementById('pRightLeg').style.backgroundColor = colors[player.pRightLeg-1];
			player.won = allPlayers[p].won;
			player.lost = allPlayers[p].lost;

		}
	}
}

function chooseEnemy() {
	var searchingEnemy = document.getElementById('searchInput').value;
	var searchingEnemyValue = -1;

	clearMonster(enemy, eTypes);
	clearPoints();

	if(searchingEnemy==="") {
		document.getElementById('searchInput').className = document.getElementById('searchInput').className + " error";

		setTimeout(function() {
			document.getElementById('searchInput').className = document.getElementById('searchInput').className.replace(" error", "");
		}, 1000);

	} else {
		for(var i=0; i<allPlayers.length; i++) {
			if(allPlayers[i].Name==searchingEnemy) {
				searchingEnemyValue = i;
			}
		}

		if(searchingEnemyValue==-1) {
			clearPoints();
			document.getElementById('enemyName').innerHTML = "No such monster in the database!";
			document.getElementById('enemyName').style.color = "red";
			setTimeout(function() {
				document.getElementById('enemyName').innerHTML = "";
				document.getElementById('enemyName').style.color = "white";
			}, 2000);
		} else {
			loadEnemy(searchingEnemyValue);
		}
	}
}

function clearMonster(monsterToClear, list) {
	// NB! clearing name might not be something you really really wanna do!
	monsterToClear.Name = "";
	document.getElementById('enemyName').innerHTML = "";

	monsterToClear.eHead = 0;
	document.getElementById(list[0]).style.backgroundColor = "#404040";
	monsterToClear.eLeftHand = 0;
	document.getElementById(list[1]).style.backgroundColor = "#404040";
	monsterToClear.eChest = 0;
	document.getElementById(list[2]).style.backgroundColor = "#404040";
	monsterToClear.eRightHand = 0;
	document.getElementById(list[3]).style.backgroundColor = "#404040";
	monsterToClear.eLeftLeg = 0;
	document.getElementById(list[4]).style.backgroundColor = "#404040";
	monsterToClear.eRightLeg = 0;
	document.getElementById(list[5]).style.backgroundColor = "#404040";
}

function randomEnemy() {
	var randomlyChosenEnemy = Math.floor(Math.random() * allPlayers.length);
	document.getElementById('enemyName').style.color = "white";

	if(allPlayers[randomlyChosenEnemy].Name==player.Name) {
		randomEnemy();
	} else {
		clearPoints();
		loadEnemy(randomlyChosenEnemy);
	}
}

function loadEnemy(chosenEnemy) {
	for(var e=0; e<allPlayers.length; e++){
		if(allPlayers[e].Name==allPlayers[chosenEnemy].Name){

			enemy.Name = allPlayers[e].Name;
			document.getElementById('enemyName').innerHTML = enemy.Name;
			enemy.eHead = allPlayers[e].pHead;
			document.getElementById('eHead').style.backgroundColor = colors[enemy.eHead-1];
			enemy.eLeftHand = allPlayers[e].pLeftHand;
			document.getElementById('eLeftHand').style.backgroundColor = colors[enemy.eLeftHand-1];
			enemy.eChest = allPlayers[e].pChest;
			document.getElementById('eChest').style.backgroundColor = colors[enemy.eChest-1];
			enemy.eRightHand = allPlayers[e].pRightHand;
			document.getElementById('eRightHand').style.backgroundColor = colors[enemy.eRightHand-1];
			enemy.eLeftLeg = allPlayers[e].pLeftLeg;
			document.getElementById('eLeftLeg').style.backgroundColor = colors[enemy.eLeftLeg-1];
			enemy.eRightLeg = allPlayers[e].pRightLeg;
			document.getElementById('eRightLeg').style.backgroundColor = colors[enemy.eRightLeg-1];
			enemy.won = allPlayers[e].won;
			enemy.lost = allPlayers[e].lost;

			alreadyPlayed = false;

		}
	}
}

function loadServerFn() {
	console.log('loadServer');

	// POST server.php save=mingivaartus
	var xmlDoc = new XMLHttpRequest();
	xmlDoc.open('GET', 'database.txt', true);

	xmlDoc.onreadystatechange = function() {
		if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
			console.log(xmlDoc.responseText);
			// tekstifaili sisu teen objektiks ja võtan väärtuse sisse
			var JSobject = JSON.parse(xmlDoc.responseText);
			allPlayers = JSobject;
	}
};

xmlDoc.send();

}

function saveServerFn() {
	console.log('saveServer');

	if(allPlayers.length===0) {
		savePlayer();
		stringToSave = "["+JSON.stringify(player)+"]";
	} else if(checkPlayer()) {
		savePlayer();
		stringToSave = JSON.stringify(allPlayers);
	} else {
		allPlayers.push(player);
		stringToSave = JSON.stringify(allPlayers);
	}

	console.log(stringToSave);

	// POST server.php save=mingivaartus
	var xmlDoc = new XMLHttpRequest();
	xmlDoc.open('POST', 'server.php', true);
	xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlDoc.onreadystatechange = function() {
		if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
			console.log(xmlDoc.responseText);
		}
	};

	xmlDoc.send('save='+stringToSave);

}

function checkPlayer() {
	var savedBefore = false;
	for(var i=0; i<allPlayers.length; i++){
		if(allPlayers[i].Name==player.Name){
			savedBefore = true;
		}
	}
	return savedBefore;
}

function savePlayer() {
	for(var i=0; i<allPlayers.length; i++){
		if(allPlayers[i].Name==player.Name){

			console.log("starting update");

			allPlayers[i].Name = player.Name;
			allPlayers[i].pHead = player.pHead;
			allPlayers[i].pLeftHand = player.pLeftHand;
			allPlayers[i].pChest = player.pChest;
			allPlayers[i].pRightHand = player.pRightHand;
			allPlayers[i].pLeftLeg = player.pLeftLeg;
			allPlayers[i].pRightLeg = player.pRightLeg;
			allPlayers[i].won = player.won;
			allPlayers[i].lost = player.lost;

		}
	}
}


function startPlay() {
	console.log("mäng algab");

	if(enemy.eHead === 0) {
		document.getElementById('enemyName').innerHTML = "Choose an enemy to fight!";
		document.getElementById('enemyName').style.color = "red";
		setTimeout(function() {
			document.getElementById('enemyName').innerHTML = "";
			document.getElementById('enemyName').style.color = "white";
		}, 1000);
	} else if (alreadyPlayed===false) {

		// Loen mõlema monsteri punktid kahe süsteemi kaudu kokku
		for(var j=0; j<6; j++) {
			enemyPoints += valuate(enemy[eTypes[j]], pTypes, player);
		}

		for(var k=0; k<6; k++) {
			playerPoints += valuate(player[pTypes[k]], eTypes, enemy);
		}

		for(var l=0; l<6; l++) {
			enemyPoints += valuate2(enemy[eTypes[l]], player[pTypes[l]]);
		}

		for(var m=0; m<6; m++) {
			playerPoints += valuate2(player[pTypes[m]], enemy[eTypes[m]]);
		}

		var playerScore = document.getElementById('playerScore');
		playerScore.innerHTML = getPlayerScore();

		var enemyScore = document.getElementById('enemyScore');
		enemyScore.innerHTML = getEnemyScore();

		winner();

		alreadyPlayed = true;
	} else {
		clearPoints();
		document.getElementById('enemyName').innerHTML = "Already fought this monster!";
		document.getElementById('enemyName').style.color = "red";
		setTimeout(function() {
			document.getElementById('enemyName').innerHTML = "";
			document.getElementById('enemyName').style.color = "white";
		}, 1000);
	}
}

function clearPoints() {
	playerPoints = 0;
	var playerScore = document.getElementById('playerScore');
	playerScore.innerHTML = "";
	playerScore.style.backgroundColor = "#eee";

	enemyPoints = 0;
	var enemyScore = document.getElementById('enemyScore');
	enemyScore.innerHTML = "";
	enemyScore.style.backgroundColor = "#eee";
}

function valuate(partValue, list, subject) {
	var points = 0;
	if(partValue==1) {
		for(var i=0; i<list.length; i++) {
			if(subject[list[i]]==2 || subject[list[i]]===0){
				points +=1;
			}
		}
	}

	else if(partValue==2) {
		for(var j=0; j<list.length; j++) {
			if(subject[list[j]]==3 || subject[list[j]]===0){
				points +=1;
			}
		}
	}

	else if(partValue==3) {
		for(var k=0; k<list.length; k++) {
			if(subject[list[k]]==1 || subject[list[k]]===0){
				points +=1;
			}
		}
	}

	return points;
}

function valuate2(subjectPartValue, partValue) {
	var points = 0;
	if(subjectPartValue==1) {
		if(partValue==2 || partValue===0) {
			points += 1;
		}
	}

	if(subjectPartValue==2) {
		if(partValue==3 || partValue===0) {
			points += 1;
		}
	}

	if(subjectPartValue==3) {
		if(partValue==1 || partValue===0) {
			points += 1;
		}
	}

	return points;
}


function winner(){

	enemyScore.style.backgroundColor = "#eee";
	playerScore.style.backgroundColor = "#eee";

	if(enemyPoints===0 && playerPoints===0) {}

	else if(enemyPoints>playerPoints) {
		enemyScore.style.backgroundColor = "yellow";
	}

	else if(enemyPoints<playerPoints) {
		playerScore.style.backgroundColor = "yellow";
	}

	else{
		enemyScore.style.backgroundColor = "yellow";
		playerScore.style.backgroundColor = "yellow";
	}
}

function getPlayerScore() {
	this.score = playerPoints;
	return score;
}

function getEnemyScore() {
	this.score = enemyPoints;
	return score;
}
