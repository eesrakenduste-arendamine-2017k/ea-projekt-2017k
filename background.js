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
      startTimer();
      sendResponse({message: "Timer started."});
    }

});

//See funktsioon paneb timeri tööle ja uuendab umbes iga sekundi tagant

function startTimer(){
	var start = moment();
	var timer = setInterval(function(){
		var diff = moment().diff(start, 'seconds');//minutes
    updateTime(diff);
    var length = localStorage ["pomodoro-selection"] || 10;
    if (diff > length) {
      clearInterval(timer);
      notifyUser();
    }
	}, 1000); //60000
  currentState = "pomodoro";
}

function updateTime(diff) {
  chrome.runtime.sendMessage({
    "command": "updateTime",
    "time": diff});
}

function notifyUser(){
  var options = {
    "type": "basic",
    "title": "Pausi aeg!",
    "message": "Aeg paus teha ja lasta silmadel puhata!",
    "iconUrl":"ikoon.png"
  };
  var idBase = "pomodoro";
  var id = idBase + (new Date()).getTime();
  chrome.notifications.create(id, options, function(){
    console.log(idBase + " created");
  })
}
