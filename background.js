window.onload = function(){ //funktsioon setSounds() läheb tööle, kui lehekülg on laetud
        setSounds();
    };
var sounds = "birds_in_rain\n" +
    "jungle\n" +
    "Light_rain_and_cricets\n" +
    "seawaves\n" +
    "shorebirds\n" +
    "sunday_church";


function pauseAll() {
    var elements = document.getElementsByClassName('player');
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
        elements[i].pause();
    }
}


function playAll(ids) {
    pauseAll();
    console.log(ids);

    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).play();
    }
}

function playSingle(id) {
    document.getElementById(id)
        .play();
}

function pauseSingle(id) {
    document.getElementById(id)
        .pause();
}

function setVolume(volume) {
    var elements = document.getElementsByClassName('player');
    for (var i = 0; i < elements.length; i++) {
        elements[i].volume = volume / 100;
    }
}


function setSounds() {
    var allsounds = sounds.split("\n");
    for (var i = 0, len = allsounds.length; i < len; i++) {
        var name = allsounds[i];

        var el = document.createElement('audio');
        el.className = 'player';
        el.id = name;
        el.src = './music/' + name +'.mp3';
        el.controls = true;
        el.loop = true;
        el.preload = 'auto';
        el.autobuffer = true;
        document.body.appendChild(el);

        el.volume = '.3';
    }
}



/*
  Pomodoro part
*/

//Globaalsed muutujad
var timerStates = {
	"off" : {"state": "off", "html": "popup.html", "nextState": "pomodoro"},
	"pomodoro" : new PomodoroState(),
	"break" : new BreakState()},
    stateKey = "off",
    currentState = timerStates[stateKey],
    timer,
    timeout;

chrome.browserAction.setPopup({
	"popup": currentState.html
});

//Lisab sõnumi listenerid timer.js jaoks.
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//Ainul siis alusta timeriga kui timer oli algul kinni. Ilma viivituseta.
		if (request.command === "startTimer" && stateKey === "off") {
			changeToNextState(false);
			sendResponse({message: "Timer started."});
		}
		//Ainult siis puhasta timerid kui timer pole kinni
		else if (request.command === "endTimer" && stateKey !== "off") {
			if (timer) clearInterval(timer);
			if (timeout) clearTimeout(timeout);
			timeout = null;
			timer = null;
			changeState("off", false); // Muuda off seisundit
			chrome.runtime.sendMessage({
				command: "timerEnded"
			});
		}
	});

/**
 * Abi Funktsioonid
 */

/**
 * Funktsioon timeri alustamiseks ja update jaoks.
 */
function startTimer() {
	var start = moment();
	timer = setInterval(function() {
	    var difference = moment().diff(start, 'minutes');
	    if (difference > currentState.length()) {
	    	stopTimer(timer);
	    	return;
	    }
	    sendUpdatedTime(difference);
	}, 1000);
}

function sendUpdatedTime(difference) {
	var time = moment().startOf("day").minutes(difference).format("m:ss");
	chrome.runtime.sendMessage({
		"command": "updateTime",
		"time": time
	});
	chrome.browserAction.setBadgeText({"text" : time});
}

/**
 *Kutsutakse kui periood saab läbi. Peatab jooksva timeri ja annab vastava teate.
 */
function stopTimer() {
	clearInterval(timer);
	timer = null;
	notifyUser();
	changeToNextState(true);
	chrome.runtime.sendMessage({
		command: "timerEnded"
	});
}

/**
 *Teatab kasutajat, et aeg sai läbi.
 */
function notifyUser() {
	var idBase = currentState.notificationBaseId;
	var id = idBase + (new Date()).getTime();
	chrome.notifications.create(id, currentState.opt, function() {
		console.log(idBase + " notification created.");
	});
}

function changeToNextState(isDelayed) {
	nextStateKey = currentState.nextState;
	changeState(nextStateKey, isDelayed);
}

/**
 * Annab varasema teate, et kasutaja teaks asju kokku tõmmata
 */
function changeState(nextStateKey, isDelayed) {
	stateKey = nextStateKey;
	currentState = timerStates[stateKey];
	chrome.browserAction.setPopup({
		"popup": currentState.html
	});


	if (currentState.hasOwnProperty("length")) {
		if (isDelayed) {
			timeout	= setTimeout(startTimer, currentState.delay*1000);
		}
		else startTimer();
	}
}
