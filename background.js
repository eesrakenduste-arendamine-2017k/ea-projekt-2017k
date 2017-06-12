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

var states = {
  "off": "something",
  "pomodoro": "something"
};
var currentState = "off";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //Ainult siis alustab timeriga, kui timer oli algselt kinni. Et ei timer jookseks viivitusteta.
    if(request.command === "startTimer" && currentState === "off") {
      changeToNextState(false);
			sendResponse({message: "Timer started."});
		}
    // Ainult sellisel juhul puhasta timerid kui timer ei tööta.
		else if (request.command === "endTimer" && stateKey !== "off") {
			if (timer) clearInterval(timer);
			if (timeout) clearTimeout(timeout);
			timeout = null;
			timer = null;
			changeState("off", false); // Change to off state
			chrome.runtime.sendMessage({
				command: "timerEnded"
			});
		}

});

//See funktsioon paneb timeri tööle ja uuendab umbes iga sekundi tagant

function startTimer(){
	var start = moment();
  timer = setInterval(function() {
  	    var difference = moment().diff(start, 'seconds');
  	    if (difference > currentState.length()) {
  	    	stopTimer(timer);
  	    	return;
  	    }
  	    sendUpdatedTime(difference);
  	}, 1000);
  }

function sendUpdatedTime(difference) {
  var time = moment().startOf("day").seconds(difference).format("m:ss");
  chrome.runtime.sendMessage({
    "command": "updateTime",
    "time": time
  });
  chrome.browserAction.setBadgeText({"text" : time});
}

  //funktsioon peatab timeri
function stopTimer() {
  clearInterval(timer);
  timer = null;
  notifyUser();
  chrome.runtime.sendMessage({
    changeToNextState(true);
    command: "timerEnded"
  });
}


function notifyUser() {
  var idBase = currentState.notificationBaseId;
  var id = idBase + (new Date()).getTime();
  chrome.notifications.create(id, currentState.opt, function() {
    console.log(idBase + " notification created.");
  }); // Callback function as 3rd parameter is required.
}

function changeToNextState(isDelayed) {
  nextStateKey = currentState.nextState;
  changeState(nextStateKey, isDelayed);
}

function changeState(nextStateKey, isDelayed) {
	stateKey = nextStateKey;
	currentState = timerStates[stateKey];
	chrome.browserAction.setPopup({
		"popup": currentState.html
	});

	// On teada, et see on mingi aja periood.
	if (currentState.hasOwnProperty("length")) {
		// Viivitada? 
		if (isDelayed) {
			timeout	= setTimeout(startTimer, currentState.delay*1000);
		}
		else startTimer();
	}
}
