Array.prototype.remove = function() { // teeb massiivi selle funktsiooniga
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) != -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var soundsToPlay;



window.onload = function() { // lehe laadimisel paneb need funktsioonid t88le
    setSounds();
    addChangeListener();
    addClickListener();
    playAll();
    CheckboxCheck();


};

function addChangeListener() {
    soundsToPlay = [];
    var volume = document.getElementById('volume');
    volume.addEventListener("change", function() {
        setVolume(volume.value); // m22rad volyymi
    });


    var sounds = document.getElementsByClassName('sound');
    for (var i = 0; i < sounds.length; i++) {
        addListenerToSound(sounds[i]);
    }
    return soundsToPlay;
}

function addListenerToSound(el) {
    //el.addEventListener("change", function() {
    //    ctrlAndPlay(el.id);
    //});
}

function setVolume(volume) {  //määrad volüümi
    chrome.extension.getBackgroundPage()
        .setVolume(volume);
}

function addClickListener() {
    var play = document.getElementById('btnPlay');
    play.addEventListener("click", function() {
        playAll();
    });
    var pause = document.getElementById('btnPause');
    pause.addEventListener("click", function() {
        pauseAll();
    });

}


function getSoundsToPlay() {
    soundsToPlay = [];
    var sounds = document.getElementsByClassName('sound');
    for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].checked) {   //kui linnuke on tehtud yhe loo kasti
            soundsToPlay.push(sounds[i].id);


        }
    }
    return soundsToPlay;

}




function setSounds() {  //väljanägemine
    var lines = sounds.split("\n");
    var stats = getStats();
    for (var i = 0; i < lines.length; i++) {
        var name = lines[i];
        var nr = stats[i];
        var description = name.replace(/^(.)|\s(.)/g, function(name) {
            return name.toUpperCase();
        });


        var br = document.createElement("br");
        document.getElementById('checks').appendChild(br);
        var inputElement = document.createElement('input');
        inputElement.className = 'sound';
        inputElement.id = name;
        inputElement.type = 'checkbox';
        document.getElementById('checks').appendChild(inputElement);

        var newlabel = document.createElement("Label");
        //newlabel.setAttribute("for", name);
        newlabel.innerHTML = description;
        document.getElementById('checks').appendChild(newlabel);

        var newlabel2 = document.createElement("Label");
        newlabel2.innerHTML = nr;
        document.getElementById('checks').appendChild(newlabel2);


   }
}
function CheckboxCheck() {
  var cbs = document.getElementsByClassName('sound');
  for(var i = 0; i < cbs.length; i++) {
    ChangeInput(cbs[i]);

  }
}
function ChangeInput(checkbox){
  checkbox.addEventListener('change', function(event) {
      if(event.target.checked)
          console.log(event.target.id);
          var history = [];

          result = localStorage.history;
          if(result){
            //console.log(result);
            history = JSON.parse(result);
          }

          history.push(event.target.id);
          localStorage.history = JSON.stringify(history);


          });
}

function getStats(){
  var counts = {};    //objekt
  var numbers = [];  //massiiv
  result = JSON.parse(localStorage.history); //Parse teeb eraldi objektideks ehk massiiviks

  for(var i = 0, j = result.length; i < j; i++) {

      counts[result[i]] = (counts[result[i]] || 0) + 1;
  }
      console.log(counts);
      numbers[0] = counts.birds_in_rain || 0;
      numbers[1] = counts.jungle || 0;
      numbers[2] = counts.Light_rain_and_cricets || 0;
      numbers[3] = counts.seawaves || 0;
      numbers[4] = counts.shorebirds || 0;
      numbers[5] = counts.sunday_church || 0;
      console.log(numbers);

      return numbers;
}
function pauseAll() {
    chrome.extension.getBackgroundPage()
        .pauseAll();
}

function playAll() {
    soundsToPlay = getSoundsToPlay();

    saveOnLocalStorage(soundsToPlay);
    chrome.extension.getBackgroundPage()
        .playAll(soundsToPlay);
    return true;
}
function saveOnLocalStorage(soundsToPlay) {
	    localStorage.playedSounds = JSON.stringify(soundsToPlay);
	}


function checkPlayedSounds() {
    var storedPlayedSounds = ["playedSounds"].localStorage;
    if (storedPlayedSounds) {

        var playedSounds = JSON.parse(storedPlayedSounds);

        if (playedSounds) {
            for (var i = 0; i < playedSounds.length; i++) {
                document.getElementById(playedSounds[i]).checked = true;

            }
        }

    }

    var storedVolume = ["soundsVolume"].localStorage;
    if (!storedVolume) {
        storedVolume = 50;
    }
    document.getElementById('volume').value = storedVolume;
    setVolume(storedVolume);


}

document.addEventListener("onclick", function timer(){

});

/*
  Form interaction
*/
var form = document.getElementById('options-form'),
    siteListEl = document.getElementById('site-list'),
    whitelistEl = document.getElementById('blacklist-or-whitelist'),
    showNotificationsEl = document.getElementById('show-notifications'),
    shouldRingEl = document.getElementById('should-ring'),
    clickRestartsEl = document.getElementById('click-restarts'),
    saveSuccessfulEl = document.getElementById('save-successful'),
    timeFormatErrorEl = document.getElementById('time-format-error'),
    background = chrome.extension.getBackgroundPage(),
    startCallbacks = {},
    durationEls = {};
durationEls['work'] = document.getElementById('work-duration');
durationEls['break'] = document.getElementById('break-duration');

var TIME_REGEX = /^([0-9]+)(:([0-9]{2}))?$/;
function readInfo (){
    console.log("form submitted");
    var durations = {},
        duration, durationStr, durationMatch;
    for (var key in durationEls) {
        durationStr = durationEls[key].value;
        durationMatch = durationStr.match(TIME_REGEX);
        if (durationMatch) {
            console.log(durationMatch);
            durations[key] = (60 * parseInt(durationMatch[1], 10));
            if (durationMatch[3]) {
                durations[key] += parseInt(durationMatch[3], 10);
            }
        } else {
            timeFormatErrorEl.className = 'show';
            return false;
        }
    }
    console.log(durations);
    background.setPrefs({
        siteList: siteListEl.value.split(/\r?\n/),
        durations: durations,
        showNotifications: showNotificationsEl.checked,
        shouldRing: shouldRingEl.checked,
        clickRestarts: clickRestartsEl.checked,
        whitelist: whitelistEl.selectedIndex == 1
    })
    saveSuccessfulEl.className = 'show';
    return false;
}
document.addEventListener("onfocus", function formAltered(){
    saveSuccessfulEl.removeAttribute('class');
    timeFormatErrorEl.removeAttribute('class');
});
document.addEventListener("onchange", function formAltered(){
    saveSuccessfulEl.removeAttribute('class');
    timeFormatErrorEl.removeAttribute('class');
});
/*showNotificationsEl.onchange = formAltered;
shouldRingEl.onchange = formAltered;
clickRestartsEl.onchange = formAltered;
whitelistEl.onchange = formAltered; */

/*Ei saa value kätte!*/

siteListEl.value = background.PREFS.siteList.join("\n");
showNotificationsEl.checked = background.PREFS.showNotifications;
shouldRingEl.checked = background.PREFS.shouldRing;
clickRestartsEl.checked = background.PREFS.clickRestarts;
whitelistEl.selectedIndex = background.PREFS.whitelist ? 1 : 0;
var duration, minutes, seconds;
for (var key in durationEls) {
    duration = background.PREFS.durations[key];
    seconds = duration % 60;
    minutes = (duration - seconds) / 60;
    if (seconds >= 10) {
        durationEls[key].value = minutes + ":" + seconds;
    } else if (seconds > 0) {
        durationEls[key].value = minutes + ":0" + seconds;
    } else {
        durationEls[key].value = minutes;
    }
    durationEls[key].onfocus = formAltered;
}
function setInputDisabled(state) {
    siteListEl.disabled = state;
    whitelistEl.disabled = state;
    for (var key in durationEls) {
        durationEls[key].disabled = state;
    }
}
startCallbacks.work = function() {
    document.body.className = 'work';
    setInputDisabled(true);
}
startCallbacks.break = function() {
    document.body.removeAttribute('class');
    setInputDisabled(false);
}
if (background.mainPomodoro.mostRecentMode == 'work') {
    startCallbacks.work();
}
