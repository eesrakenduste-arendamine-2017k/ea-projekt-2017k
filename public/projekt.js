// **** GLOBAALSED MUUTUJAD ****

// muutujad mängu jaoks
var online = true;
var matrixFinalAnswerErrors = 0;
var matrixPreAnswerErrors = 0;
var Btn;
//mängu skoori muutujad
var score = 0;
var sumOfExercises = 0;
var errorCount = 0;
var playerName = "";

//timeri muutujad
var timeInSecs;
var ticker;

var answerCounter = 0;

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;

// harjutusmaatriksi mõõdu muutujad
var Em1x, Em1y, Em2x, Em2y;

// massiivid harjutusmaatriksite väärtuste jaoks
var a = [[null, null, null]];
var b = [[null, null, null]];

// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

//SERVICEWORKER-i osa
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
		//Registration was successful
		console.log('ServiceWorker registration successful: ', registration);
		registerNotifications(registration)
	}, function (err) {
		//registration failed
		console.log('ServiceWorker registration failed: ', err);
	});
}

function registerNotifications(registration) {
	registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlB64ToUint8Array("BO9Br-LnntR7cvm5-YQNGhFgkX4LS0vb_7mP6w3xsyb0Nrle4HBIJIzP-fhbo_9BbIaF_HGLDh3KvZUTjjEyyMc")
	})
	.then(function (subscription) {
		console.log('User is subscribed.');
		console.dir(JSON.stringify(subscription));
	})
	.catch (function (err) {
		console.log('Failed to subscribe the user: ', err);
	});
}

function urlB64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4);
	var base64 = (base64String + padding)
	.replace(/\-/g, '+')
	.replace(/_/g, '/');

	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****
function generateMatrix() {
	document.getElementById("checkAnswer").style.visibility = "visible";

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

// **** FUNKTSIOON, MIS GENEREERIB VAHEPEALSE VASTUSE MAATRIKSI ****
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
//mängija nime küsimine
function setPlayerName() {
	playerName = prompt("Sisesta mängija nimi");
	if (playerName === null) {
		return;
	} else if (playerName === "") {
		playerName = "Nimetu";
	} else {
		document.getElementById("playerName").innerHTML = "MÄNGIJA: " + playerName;
		startTimer(60);
		//generateExerciseMatrix();
		generateRandomExerciseMatrix();
	}
}

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****
function generateExerciseMatrix() {

	document.getElementById("exerciseMatrix1Container").style.visibility = "visible";
	document.getElementById("exerciseMatrix2Container").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestart").style.visibility = "visible";

	Em1x = 1;
	Em1y = 1;
	Em2x = 1;
	Em2y = 1;

	var Em1 = document.getElementById("exerciseMatrix1");
	var Em2 = document.getElementById("exerciseMatrix2");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");
	var EmFA = document.getElementById("exerciseMatrixAnswer");

	if (Em1y === Em2x) {

		//console.log("Saab arvutada");
		//console.log("Esimene maatriks on Em1x x Em1y (" + Em1x + " x " + Em1y + ")");
		//console.log("Teine maatriks on Em2x x Em2y (" + Em2x + " x " + Em2y + ")");

		if (Em1 && Em2 && EmFA && EmPA) {

			Em1.innerHTML = "";
			Em2.innerHTML = "";
			EmPA.innerHTML = "";
			EmFA.innerHTML = "";

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixPreAnswer();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixPreAnswer();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();
		}

	} else {
		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");
	}
}

// **** GENEREERIB SUVALISE SUURUSEGA MAATRIKSID ****
function generateRandomExerciseMatrix() {

	document.getElementById("exerciseMatrix1Container").style.visibility = "visible";
	document.getElementById("exerciseMatrix2Container").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("beginGame").style.visibility = "hidden";
	document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestartRandom").style.visibility = "visible";

	Em1x = Math.floor((Math.random() * 5) + 1);
	Em1y = Math.floor((Math.random() * 5) + 1);
	Em2x = Em1y;
	Em2y = Math.floor((Math.random() * 5) + 1);

	var Em1 = document.getElementById("exerciseMatrix1");
	var Em2 = document.getElementById("exerciseMatrix2");
	var EmFA = document.getElementById("exerciseMatrixAnswer");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");

	if (Em1y === Em2x) {

		//console.log("Saab arvutada Random");
		//console.log("Esimene maatriks on Em1x x Em1y (" + Em1x + " x " + Em1y + ")");
		//console.log("Teine maatriks on Em2x x Em2y (" + Em2x + " x " + Em2y + ")");

		if (Em1 && Em2 && EmFA && EmPA) {

			Em1.innerHTML = "";
			Em2.innerHTML = "";
			EmFA.innerHTML = "";
			EmPA.innerHTML = "";

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixAnswer();
			createExerciseMatrixPreAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixAnswer();
			createExerciseMatrixPreAnswer();
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

// **** FUNKTSIOON, MIS GENEREERIB VAHETULEMUSTE MAATRIKSI ****
function createExerciseMatrixPreAnswer() {

	var exerciseMatrixPreAnswerContainer = document.getElementById("exerciseMatrixPreAnswerContainer");
	var EmAnswerWidth = 42 * Em2y * 3;
	var EmAnswerHeight = 28 * Em1x;

	var Em1Width = 42 * Em1y;
	var Em2Width = 42 * Em2y;
	var EmPreAnswerPosition = Em1Width + Em2Width + 30;

	exerciseMatrixPreAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixPreAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixPreAnswerContainer.style.left = EmPreAnswerPosition + "px";

	var exerciseMatrixPreAnswer = document.getElementById("exerciseMatrixPreAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < Em1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < Em2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ed" + rowId + colId);
			cell.setAttribute("class", "matrixAnswerInput");
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixPreAnswer.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VASTUSEMAATRIKSI ****
function createExerciseMatrixAnswer() {

	var exerciseMatrixAnswerContainer = document.getElementById("exerciseMatrixAnswerContainer");
	var EmAnswerWidth = 42 * Em2y;
	var EmAnswerHeight = 28 * Em1x;

	var Em1Width = 42 * Em1y;
	var Em2Width = 42 * Em2y;
	var EmPreAnswerWidth = 42 * Em2y * 3;
	var EmAnswerPosition = Em1Width + Em2Width + EmPreAnswerWidth + 40;

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

// **** KONTROLLIB MAATRIKSITE VASTUSEID ****
function checkMatrixFinalAnswers() {

	var c = 1;

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

			if (matrixInputCell == matrixCellValue) {
				matrixAnswer.style.color = "green";
				//answerCounter += 1
				//score += 1
				//console.log("skoor " + score)
				//console.log("lahendatud maatrikseid: " + sumOfExercises)
			} else {
				matrixAnswer.style.color = "red";
				//errorCount += 1;
				matrixFinalAnswerErrors++;
			}
		}
	}
}

// **** KONTROLLIB VAHEMAATRIKSITE VASTUSEID ****
function checkMatrixPreAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {
				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			var matrixCellValue = matrixAnswerString.slice(0, strLength - 3);
			var matrixInputCell = matrixAnswer.value;
			c = 1;

			if (matrixInputCell === matrixCellValue) {
				matrixAnswer.style.color = "green";
				//answerCounter += 1
				//score += 1
			} else {
				matrixAnswer.style.color = "red";
				//errorCount += 1;
				matrixPreAnswerErrors++;
			}
		}
	}
}

// **** JUST FOR DEVS FUNKTSIOON, MIS GENEREERIB MÄNGU TESTIMISEKS MAATRIKSITESSE ÕIGED VASTUSED ****
function justForDevsMatrixAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixFinalAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {

				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			matrixAnswer.value = matrixAnswerString.slice(0, strLength - 3);
			matrixFinalAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
			c = 1;
		}
	}
}

// **** KÄIVITAB MAATRIKSITE VASTUSTE KONTROLLI (mitte random suurustega kuvatud maatriksid) ****
function checkMatrixAnswers() {

	checkMatrixFinalAnswers();
	checkMatrixPreAnswers();

	if (matrixFinalAnswerErrors === 0 && matrixPreAnswerErrors === 0) {
		updateScore();
		generateExerciseMatrix();
	} else {
		updateScore();
	}
	matrixFinalAnswerErrors = 0;
	matrixPreAnswerErrors = 0;
}

// **** KÄIVITAB MAATRIKSITE VASTUSTE KONTROLLI (random suurustega kuvatud maatriksid) ****
function checkMatrixAnswersRandom() {

	checkMatrixFinalAnswers();
	checkMatrixPreAnswers();

	if (matrixFinalAnswerErrors === 0 && matrixPreAnswerErrors === 0) {
		var matrixScore = Em1x * Em1y * Em2x * Em2y;
		console.log("");
		console.log("Maatriks suurusega " + Em1x + "x" + Em1y + " x " + Em2x + "x" + Em2y);
		console.log("Skoori arvutamine " + Em1x + "*" + Em1y + "*" + Em2x + "*" + Em2y + " = " + (Em1x * Em1y * Em2x * Em2y));
		console.log("Skoor kokku " + score + "+" + matrixScore + " = " + (score + matrixScore));
		sumOfExercises++;
		score += matrixScore;
		updateScore();
		generateRandomExerciseMatrix();
	} else {
		var matrixErrorScore = parseInt((Em1x * Em1y * Em2x * Em2y) / 2, 10);
		console.log("");
		console.log("Maatriks suurusega " + Em1x + "x" + Em1y + " x " + Em2x + "x" + Em2y);
		console.log("Vea skoori arvutamine " + "(" + Em1x + "*" + Em1y + "*" + Em2x + "*" + Em2y + ")/2" + " = " + ((Em1x * Em1y * Em2x * Em2y) / 2));
		console.log("Skoor kokku " + score + "-" + matrixErrorScore + " = " + (score - matrixErrorScore));
		console.log("");
		score -= matrixErrorScore;
		errorCount++;
		updateScore();
	}
	matrixFinalAnswerErrors = 0;
	matrixPreAnswerErrors = 0;
}

//TULEMUSTE SALVESTAMINE LOCALSTORAGESSE

function saveStatsToLocalstorage(dataObject) {
	if (!localStorage["top"]) {
		var arr = []
		arr.push(dataObject)
		localStorage.setItem("top", JSON.stringify(arr))
	} else {
		var arr = JSON.parse(localStorage.getItem("top"))
			arr.push(dataObject)
			var sorted = sortArray(arr)
			localStorage.setItem("top", JSON.stringify(sorted));
	}
}

function sortArray(arr) {
	arr.sort(function (a, b) {
		return b.score - a.score;
	});
	var sliceArray = arr.slice(0, 10)
		return sliceArray
}

function loadStatsFromLocalStorage() {
	if (localStorage.getItem("top")) {
		var arr = JSON.parse(localStorage.getItem("top"))
			createTable(arr)
	}
	else{
		console.log("localstorage tühi!")
	}
}

// MÄNGU SKOORI FUNKTSIOONID
function resetScore() {
	document.getElementById("justForDevs").style.visibility = "hidden";
	document.getElementById("checkAndRestartRandom").style.visibility = "hidden";
	document.getElementById("beginGame").style.visibility = "visible";

	document.getElementById("exerciseMatrix1Container").style.visibility = "hidden";
	document.getElementById("exerciseMatrix2Container").style.visibility = "hidden";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "hidden";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "hidden";

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

//MÄNGIJA TULEMUSTE SAATMINE SERVERILE, ÜHENDUSE PUUDUMISE KORRAL LOCALSTORAGELE
function sendDataToServer(object) {
	if(online){
    var xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.open('POST', 'http://www.heleri.eu/save', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200  ) {
            console.log("RESPONSE TEXT " + xhr.responseText);
            console.log("saadan serverisse")
			
        }
	
    }
	xhr.send(object);
	}
	if(!online) {
		saveStatsToLocalstorage(JSON.parse(object))
console.log("saadan localstoragesse")
		
	}
	
    

}



//TOP10 TABELI JAOKS ANDMED SERVERIST VÕI ÜHENDUSE PUUDUMISE KORRAL LOCALSTORAGEST
function viewTopPlayers() {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.open("POST", "http://www.heleri.eu/load", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
		
	if(online) {
		 if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("tõmban serverist")
            var dB = JSON.parse(xhr.responseText)
            $("#myTable").remove();
            createTable(dB)
        }
		
		
	}
		
		
       
		else {
		$("#myTable").remove();
        loadStatsFromLocalStorage()
        console.log("tõmban localstoragest")
			
		}
    }
	xhr.send();
    
    
}



//UUE MÄNGU ALUSTAMINE(pole kõige parem meetod)

function startNewGame() {

	document.getElementById("generateExerciseMatrix").style.visibility = "visible";
	document.getElementById("generateRandomExerciseMatrix").style.visibility = "visible";
	document.getElementById("startNewGame").style.visibility = "hidden";

	window.location.reload(false);
	generateExerciseMatrix();
}

//TOP10 SKOORIDE TABEL JQUERY ABIL
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

//TAIMER
function startTimer(secs) {
	timeInSecs = parseInt(secs) - 1;
	ticker = setInterval("tick()", 1000); // every second
}
function tick() {
	var secs = timeInSecs;
	if (secs >= 0) {
		timeInSecs--;
	} else {
		clearInterval(ticker); // stop counting at zero
		resetScore();
		// startTimer(60);  // remove forward slashes in front of startTimer to repeat if required
	}
	if (secs == -1) {
		document.getElementById("stopper").innerHTML = "AEG: " + 0;
	} else {
		document.getElementById("stopper").innerHTML = "AEG: " + secs;
	}
	if (secs = 0) {
		resetScore();
		clearInterval(ticker)
	}

}


window.addEventListener("offline", function(e) {
  online = false
}, false);

window.addEventListener("online", function(e) {
  online = true
}, false);