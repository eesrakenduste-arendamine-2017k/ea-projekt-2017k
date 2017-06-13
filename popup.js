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
//Lisab click handlerid nuppudele
/*function init() {
  document.getElementById("pomodoro").innerText = localStorage["pomodoro-selection"] || 5;
  	document.getElementById("break").innerText = localStorage["break-selection"] || 5;

  	var buttonGroups = document.getElementsByClassName("time-buttons-group")
  	Array.prototype.forEach.call(buttonGroups, function(divElem) {

  		Array.prototype.forEach.call(divElem.childNodes, function(elem) {
  			elem.onclick = timeButtonOnClickHandler;
  		});

  	});

  }

function timeButtonOnClickHandler(event) {
  var targetElem = event.target;
  var timeSelected = +targetElem.innerText; // Saab nupu teksti ja converdib nr-ks
  var settingKey = targetElem.parentNode.id;
  localStorage[settingKey] = timeSelected; // Salvestab localstorage.
  document.getElementById(settingKey.split("-")[0]).innerText = timeSelected;
}*/

/*document.addEventListener('DOMContentLoaded', init);*/
