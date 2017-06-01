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
