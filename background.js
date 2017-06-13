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
/*var timerStates = [
 	{"state": "off", "html": "popup.html"},
  {"state": "pomodoro", "html": "timer.html"},
  {"state": "short", "html": "timer.html"}];
   var currentState = 0;*/

function startTimer(start) {
  var runningTimer = setInterval(function() {
    var difference = moment().diff(start, 'seconds');
    if (difference > 10) {
      stopTimer(runningTimer);
      return;
    }
    sendUpdatedTime(difference);
  }, 1000);
}

function stopTimer(timer) {
  clearInterval(timer);
  notifyUser();
  chrome.runtime.sendMessage({
    command: "timerEnded"
  });
}

function sendUpdatedTime(difference) {
  var time = moment().startOf("day").seconds(difference).format("m:ss");
  chrome.runtime.sendMessage({
    "command": "updateTime",
    "time": time
  });
}

function notifyUser() {
  var opt = {
    type: "basic",
    title: "Aeg sai läbi!",
    message: "Aeg teha paus! Paus algab 10 sekundi pärast.",
    iconUrl: "ikoon.png"
  };
  var timestamp = new Date().getTime();
  var notification = chrome.notifications.create("periodOver" + timestamp, opt, function() {
    console.log("Notification created. This callback function is required.");
  });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command == "startTimer") {
      var start = moment();
      startTimer(start);
      sendResponse({message: "Timer started."});
    }
  })
