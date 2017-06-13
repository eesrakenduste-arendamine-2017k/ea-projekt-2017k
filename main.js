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

var playerString = {};
var allPlayers =[];

var colors = ["#ffc0cb", "#b3b3b3", "#966d4f"];// roosa, hõbedane, pruun
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];



window.onload = function(){

	loadServerFn();

	setTimeout(function() {
		loadPlayer();
	}, 100);

};

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

function loadPlayer() {
	for(var p=0; p<allPlayers.length; p++){
		if(allPlayers[p].Name==player.Name){

			console.log(player.Name);
			player.Name = allPlayers[p].Name;
			player.pHead = allPlayers[p].pHead;
			document.getElementById('SPHead').style.backgroundColor = colors[player.pHead-1];
			player.pLeftHand = allPlayers[p].pLeftHand;
			document.getElementById('SPLeftHand').style.backgroundColor = colors[player.pLeftHand-1];
			player.pChest = allPlayers[p].pChest;
			document.getElementById('SPChest').style.backgroundColor = colors[player.pChest-1];
			player.pRightHand = allPlayers[p].pRightHand;
			document.getElementById('SPRightHand').style.backgroundColor = colors[player.pRightHand-1];
			player.pLeftLeg = allPlayers[p].pLeftLeg;
			document.getElementById('SPLeftLeg').style.backgroundColor = colors[player.pLeftLeg-1];
			player.pRightLeg = allPlayers[p].pRightLeg;
			document.getElementById('SPRightLeg').style.backgroundColor = colors[player.pRightLeg-1];
			player.won = allPlayers[p].won;
			player.lost = allPlayers[p].lost;

		}
	}
}
