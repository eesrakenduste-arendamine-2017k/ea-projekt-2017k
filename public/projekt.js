/*function dropdownFunction() {
document.getElementById("Ydropdown").classList.toggle("show");
}

window.onclick = function(event) {
if (!event.target.matches('.dropdownbtn')) {
var Ydropdowns = document.getElementsByClassName("YdropdownContent");
var i;
for (i=0; i<Ydropdowns.length; i++) {
var openDropdown = Ydropdowns[i];
if (openDropdown.classList.contains('show')) {
openDropdown.classList.remove('show');
}
}
}
var e = document.getElementById("dropdown");
var strUser = e.options[e.selectedIndex].text;
console.log(strUser);
}
 */
//Välja printimiseks
// var x1, x2, y1, y2;
// var matrix = [];
// var matrix1 = [];
// var matrix2 = [];
// var answerMatrix1 = [];
// var answerMatrix2 = [];
// var inputBoxvalue1;
// var inputBoxvalue2;
// var IDCounter = 0;


// **** GLOBAALSED MUUTUJAD ****


//mängu skoori muutujad
var score = 0;
var sumOfExercises = 0;
var errorCount = 0;
var playerName = "";

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;

// harjutusmaatriksi mõõdu muutujad
var Em1x, Em1y, Em2x, Em2y;

// massiivid harjutusmaatriksite väärtuste jaoks
var a = [[null, null, null]];
var b = [[null, null, null]];

// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||


// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

function generateMatrix() {

	m1x = document.getElementById("m1x").value;
	m1y = document.getElementById("m1y").value;
	m2x = document.getElementById("m2x").value;
	m2y = document.getElementById("m2y").value;

	var m1 = document.getElementById("matrix1");
	var m2 = document.getElementById("matrix2");
	var mA = document.getElementById("matrixAnswer");
	var mFA = document.getElementById("matrixFinalAnswer");

	if (m1y === m2x) {

		console.log("Saab arvutada");
		console.log("Esimene maatriks on m1x x m1y (" + m1x + " x " + m1y + ")");
		console.log("Teine maatriks on m2x x m2y (" + m2x + " x " + m2y + ")");

		if (m1 && m2 && mA && mFA) {

			m1.innerHTML = "";
			m2.innerHTML = "";
			mA.innerHTML = "";
			mFA.innerHTML = "";

			createMatrix1();
			createMatrix2();
			createMatrixAnswer();
			createMatrixFinalAnswer();

		} else {

			createMatrix1();
			createMatrix2();
			createMatrixAnswer();
			createMatrixFinalAnswer();
		}

	} else {

		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");

	}

}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****

function createMatrix1() {

	var matrix1Container = document.getElementById("matrix1Container");
	var m1Width = 42 * m1y;
	var m1Height = 28 * m1x;
	matrix1Container.style.width = m1Width + "px";
	matrix1Container.style.height = m1Height + "px";

	var matrix1 = document.getElementById("matrix1");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m1y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "a" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	matrix1.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE MAATRIKSI ****

function createMatrix2() {

	var matrix2Container = document.getElementById("matrix2Container");
	var m2Width = 42 * m2y;
	var m2Height = 28 * m2x;

	var m1Width = 42 * m1y;
	var m2Position = m1Width + 20;

	matrix2Container.style.width = m2Width + "px";
	matrix2Container.style.height = m2Height + "px";
	matrix2Container.style.left = m2Position + "px";

	var matrix2 = document.getElementById("matrix2");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m2x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "b" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	matrix2.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VAHEPEALSE VASTUSE MAATRIKSI (see on praegu potentsiaalselt placeholder) ****

function createMatrixAnswer() {

	var matrixAnswerContainer = document.getElementById("matrixAnswerContainer");
	var mAnswerWidth = 42 * m2y * 3;
	var mAnswerHeight = 28 * m1x;

	var m1Width = 42 * m1y;
	var m2Width = 42 * m2y;
	var mAnswerPosition = m1Width + m2Width + 30;

	matrixAnswerContainer.style.width = mAnswerWidth + "px";
	matrixAnswerContainer.style.height = mAnswerHeight + "px";
	matrixAnswerContainer.style.left = mAnswerPosition + "px";

	var matrixAnswer = document.getElementById("matrixAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "c" + rowId + colId);
			cell.setAttribute("class", "matrixAnswerInput");
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	matrixAnswer.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB LÕPLIKU VASTUSE MAATRIKSI ****

function createMatrixFinalAnswer() {

	var matrixFinalAnswerContainer = document.getElementById("matrixFinalAnswerContainer");
	var mFinalAnswerWidth = 42 * m2y;
	var mFinalAnswerHeight = 28 * m1x;

	var m1Width = 42 * m1y;
	var m2Width = 42 * m2y;
	var mAnswerWidth = 42 * m2y * 3;
	var mFinalAnswerPosition = m1Width + m2Width + mAnswerWidth + 40;

	matrixFinalAnswerContainer.style.width = mFinalAnswerWidth + "px";
	matrixFinalAnswerContainer.style.height = mFinalAnswerHeight + "px";
	matrixFinalAnswerContainer.style.left = mFinalAnswerPosition + "px";

	var matrixFinalAnswer = document.getElementById("matrixFinalAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "d" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	matrixFinalAnswer.appendChild(tableBody);
}

// **** KÄIVITAB ARVUTAMISE ****

function calculateMatrix() {

	calculateMatrixAnswer();
	calculateMatrixFinalAnswer();

}

// **** GENEREERIB VAHETULEMUSE ****

function calculateMatrixAnswer() {

	var c = 1;

	for (var x = 1; x <= m1x; x++) {

		for (var y = 1; y <= m2y; y++) {

			var matrixAnswer = document.getElementById("c" + x + y);
			var matrixAnswerString = "";

			for (var i = 0; i < m1y; i++) {

				var a = document.getElementById("a" + x + c).value;
				var b = document.getElementById("b" + c + y).value;
				matrixAnswerString += a + "*" + b + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			matrixAnswer.value = matrixAnswerString.slice(0, strLength - 3);
			c = 1;
		}
	}
}

// **** ARVUTAB MAATRIKSI VÄÄRTUSE ****

function calculateMatrixFinalAnswer() {

	var c = 1;

	for (var x = 1; x <= m1x; x++) {

		for (var y = 1; y <= m2y; y++) {

			var matrixAnswer = document.getElementById("d" + x + y);
			var matrixAnswerString = "";

			for (var i = 0; i < m1y; i++) {

				var a = document.getElementById("a" + x + c).value;
				var b = document.getElementById("b" + c + y).value;
				matrixAnswerString += a + "*" + b + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			matrixAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
			c = 1;
		}
	}
}






















// ||||| ----- ----- ----- ----- MAATRIKSITE HARJUTAMISE OSA ----- ----- ----- ----- |||||

//Mängija nimi


//mängija nime küsimine
function setPlayerName() {

	playerName = prompt("Sisesta mängija nimi");

	if (playerName === null || playerName === "") {
		playerName = "Nimetu";

	}
	document.getElementById("playerName").innerHTML = "MÄNGIJA: " + playerName;

}

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

function generateExerciseMatrix() {

	Em1x = document.getElementById("Em1x").value;
	Em1y = document.getElementById("Em1y").value;
	Em2x = document.getElementById("Em2x").value;
	Em2y = document.getElementById("Em2y").value;

	var Em1 = document.getElementById("exerciseMatrix1");
	var Em2 = document.getElementById("exerciseMatrix2");
	var EmFA = document.getElementById("exerciseMatrixAnswer");

	if (Em1y === Em2x) {

		console.log("Saab arvutada");
		console.log("Esimene maatriks on Em1x x Em1y (" + Em1x + " x " + Em1y + ")");
		console.log("Teine maatriks on Em2x x Em2y (" + Em2x + " x " + Em2y + ")");

		if (Em1 && Em2 && EmFA) {

			Em1.innerHTML = "";
			Em2.innerHTML = "";
			EmFA.innerHTML = "";

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();
		}

	} else {

		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");

	}

}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE HARJUTUSMAATRIKSI ****

function createExerciseMatrix1() {

	var exerciseMatrix1Container = document.getElementById("exerciseMatrix1Container");
	var Em1Width = 42 * Em1y;
	var Em1Height = 28 * Em1x;
	exerciseMatrix1Container.style.width = Em1Width + "px";
	exerciseMatrix1Container.style.height = Em1Height + "px";

	var exerciseMatrix1 = document.getElementById("exerciseMatrix1");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em1x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em1y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ea" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrix1.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE HARJUTUSMAATRIKSI ****

function createExerciseMatrix2() {

	var exerciseMatrix2Container = document.getElementById("exerciseMatrix2Container");
	var Em2Width = 42 * Em2y;
	var Em2Height = 28 * Em2x;

	var Em1Width = 42 * Em1y;
	var Em2Position = Em1Width + 20;

	exerciseMatrix2Container.style.width = Em2Width + "px";
	exerciseMatrix2Container.style.height = Em2Height + "px";
	exerciseMatrix2Container.style.left = Em2Position + "px";

	var exerciseMatrix2 = document.getElementById("exerciseMatrix2");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em2x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em2y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Eb" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	exerciseMatrix2.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VASTUSEMAATRIKSI ****

function createExerciseMatrixAnswer() {

	var exerciseMatrixAnswerContainer = document.getElementById("exerciseMatrixAnswerContainer");
	var EmAnswerWidth = 42 * Em2y;
	var EmAnswerHeight = 28 * Em1x;

	var Em1Width = 42 * Em1y;
	var Em2Width = 42 * Em2y;
	var EmAnswerPosition = Em1Width + Em2Width + 30;

	exerciseMatrixAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixAnswerContainer.style.left = EmAnswerPosition + "px";

	var exerciseMatrixAnswer = document.getElementById("exerciseMatrixAnswer");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em1x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em2y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ec" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);

		}
		tableBody.appendChild(row);
	}
	exerciseMatrixAnswer.appendChild(tableBody);
}

// **** KÄIVITAB ARVUDE GENEREERIMISE MAATRIKSISSE ****

function generateValuesForMatrices() {

	generateValuesForMatrix1();
	generateValuesForMatrix2();

	sumOfExercises += 1;

}

// **** GENEREERIB VÄÄRTUSED ESIMESSE MAATRIKSISSE JA MASSIIVI ****

function generateValuesForMatrix1() {

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= Em1y; colId++) {

			var randomValue = Math.floor((Math.random() * 10) + 1);
			matrixRow.push(randomValue);
			var matrixCell = document.getElementById("Ea" + rowId + colId);
			matrixCell.value = randomValue;
		}
		a.push(matrixRow);
		matrixRow = [null];
	}
}

// **** GENEREERIB VÄÄRTUSED TEISE MAATRIKSISSE JA MASSIIVI ****

function generateValuesForMatrix2() {

	for (var rowId = 1; rowId <= Em2x; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= Em2y; colId++) {

			var randomValue = Math.floor((Math.random() * 10) + 1);
			matrixRow.push(randomValue);
			var matrixCell = document.getElementById("Eb" + rowId + colId);
			matrixCell.value = randomValue;
		}
		b.push(matrixRow);
		matrixRow = [null];
	}
}

function checkMatrixAnswers() {

	c = 1;

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {

				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			var matrixCellValue = math.eval(matrixAnswerString.slice(0, strLength - 3));
			var matrixInputCell = parseInt(matrixAnswer.value);
			c = 1;

			console.log(matrixInputCell);
			console.log(matrixCellValue);

			if (matrixInputCell == matrixCellValue) {
				matrixAnswer.style.color = "green";

				score += 1
				console.log("skoor " + score)
				console.log("lahendatud maatrikseid: " + sumOfExercises)

			} else {
				matrixAnswer.style.color = "red";
				errorCount += 1;
			}

		}
	}
	updateScore();
	//tuleb lisada veel kontroll, mis ei lase "kontrolli vastuseid" nuppu spämmida


}







// MÄNGU SKOORI FUNKTSIOONID
function resetScore() {
	alert("MÄNG LÄBI! Sinu skoor: " + score + ", vigu tegid kokku " + errorCount + ", maatrikseid kokku: " + sumOfExercises)

	var gameData = {
		"name": playerName,
		"score": score,
		"errors": errorCount,
		"exercises": sumOfExercises
	}
	sendDataToServer(JSON.stringify(gameData));
	score = 0;
	sumOfExercises = 0;
	errorCount = 0;
	updateScore();

}

function updateScore() {
	document.getElementById("playerScore").innerHTML = "SKOOR: " + score;
	document.getElementById("TotalSum").innerHTML = "MAATRIKSEID KOKKU: " + sumOfExercises;
	document.getElementById("wrongAnswers").innerHTML = "VIGU: " + errorCount;
	document.getElementById("playerName").innerHTML = "MÄNGIJA: " + playerName;

}

//mängija tulemuste saatmine serverile
function sendDataToServer(object) {

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://draama.duckdns.org:30001', true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			console.log(xhr.responseText);
		}
	}

	xhr.send(object);
}

//top10 tabeli funktsioon(andmed serverist)
function viewTopPlayers() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var dB = JSON.parse(xhttp.responseText)

				$("#myTable").remove();
			createTable(dB)
		}
	};
	xhttp.open("GET", "http://draama.duckdns.org:30001/top", true);
	xhttp.send();

}

//uue mängu alustamine(pole kõige parem meetod)

function startNewGame() {
	window.location.reload(false);

}

//top10 skooride tabeli loomine jquery abil
function createTable(obj) {

	var tbl = $("<table/>").attr("id", "myTable");

	$("#scoreTable").append(tbl);
	$("#myTable").append("<th>Nimi</th>" + "<th>Skoor</th>" + "<th>Vigu</th>" + "<th>Maatrikseid</th>")

	for (var i = 0; i < obj.length; i++) {
		var tr = "<tr>";
		var td1 = "<td>" + obj[i]["name"] + "</td>";
		var td2 = "<td>" + obj[i]["score"] + "</td>";
		var td3 = "<td>" + obj[i]["errors"] + "</td>";
		var td4 = "<td>" + obj[i]["exercises"] + "</td></tr>";

		$("#myTable").append(tr + td1 + td2 + td3 + td4);

	}
}




















//EI TEA KAS ON KÕIGE OPTIMAALSEM VÄÄRTUSE SAAMISE VIIS
function Calculate() {

	for (var i = 0; i < x1; i++) {
		matrix[i] = [];
		for (var j = 0; j < y1; j++) {
			matrix[i][j] = undefined;
			console.log(matrix[i][j]);
			//CreateInput(x1);
		}
	}

	IDCounter = 0;
	for (var i = 0; i < x1; i++) {
		for (var j = 0; j < y1; j++) {
			IDCounter++;
			//console.log("IDCOUNTER1: "+IDCounter);
			//inputBoxvalue1 = document.getElementById("inputmatrix" + IDCounter).value;
			matrix[i][j] = document.getElementById("inputmatrix" + IDCounter).value;
			console.log("Maatriks: " + matrix[i][j] + "; I:" + i + "; J:" + j);
			//console.log("inputBoxvalue1: "+inputBoxvalue1);
			//matrix1.push(inputBoxvalue1);
			/*
			MAATRIKS PEAKS OLEMA KUJUL (2x2)
			1 2
			3 4
			 */
		}
	}
	console.log("Esimene maatriks: " + matrix1);
	IDCounter = 30;
	for (var i = 0; i < x2; i++) {
		for (var j = 0; j < y2; j++) {
			IDCounter++;
			//console.log("IDCOUNTER2: "+IDCounter);
			inputBoxvalue2 = document.getElementById("inputmatrix" + IDCounter).value;
			//console.log("inputBoxvalue2: "+inputBoxvalue2);
			matrix2.push(inputBoxvalue2);
			//var test+IDCounter = inputBoxvalue2;
			//console.log("MUUTUJA TEST+IDCOUNTER"+ window["test"+IDCounter]);
		}
	}
	console.log("Teine maatriks: " + matrix2);

	//http://jsfiddle.net/xW7d8/

	/*
	answerMatrix1 =
	answerMatrix2 =


	for(var i=0; i<x1; i++) {
	for(var j=0; j<x2; j++) {
	var test = (matrix1[i]*matrix2[j]) + (matrix1[i]*matrix2[j]);
	console.log("TEST VASTUS TSÜKLI SEES: " + test);
	}
	}

	var test = (matrix1[0]*matrix2[0]) + (matrix1[1]*matrix2[2]);
	console.log("TEST VASTUS: "+test);
	 */

	//https://www.youtube.com/watch?v=x7zua7fhyIw
	//ASI MIDA VÕIK IMITEERIDA---->https://mkaz.tech/math/javascript-linear-algebra-calculator/

}

/*
function Delete(){
console.log("KUSTUTA");

var tables = document.getElementsByTagName("TABLE");
for (var i=tables.length-1; i>=0;i-=1){
console.log(tables[i]);
if (tables[i]){
tables[i].parentNode.removeChild(tables[i]);
}
}


//document.getElementById("InputTable1").deleteRow(0);

/*
var table = document.getElementById("InputTable1");
var rowCount = table.rows.length;
console.log("rowCount: "+rowCount);
for(var i=0; i<x1; i++) {
//for(var i=0; i<x2; i++) {
//while(table.rows.length > 0) {
table.deleteRow(i);
console.log("KUSTUTA TSÜKLI SEES");
//}
}
}
 */
//}


/* 2x2 maatriksi arvutamine
(inputmatrix1*inputmatrix31)+(inputmatrix2*inputmatrix33)	(inputmatrix1*inputmatrix32)+(inputmatrix2*inputmatrix34)
(inputmatrix3*inputmatrix31)+(inputmatrix4*inputmatrix33)	(inputmatrix3*inputmatrix32)+(inputmatrix4*inputmatrix34)
 */

//function CreateInput() {
/*
var x = document.createElement("INPUT");
x.setAttribute("id", "inputmatrix");
x.setAttribute("type", "text");
document.body.appendChild(x);
 */
//}