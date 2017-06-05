console.log('Extension loaded . . .');
//var timeout = setTimeout(dataFlow, 3000);
console.log('Timer starts . . .');
// console.log(document.getElementsByTagName("body")[0]);


//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;
console.log('Key press event . . .');


var data = null;
var count;
var letters;
var keys = null;
var helpC = [];
var counter = [];

var pressedLetters = [];

var timeout;
var state;

console.log('Variables declared');
//teeme massiii kuhu paneme vajutused, ja iga **aja p2rast salvestame andmebaasi



//database
var database = firebase.database();
var ref = database.ref('statistics');
console.log('DB variables declared');

//ref.once('value', getData, errData);
console.log('Ref.on');



//load data
function getData(data) {

    letters = data.val();
    updateCount();

}

function errData(err){
  console.log('Error!');
  console.log(err);
}


function pressed(e) {
    // console.log('counter '+counter.length);
    console.log('Key pressed start . . .');

    pressedLetters.push(e.key);

    if(timeout){
      clearTimeout(timeout);
    }

    timeout = setTimeout(getDataFromDb, 3000);

    // state = false;
    // hakkame kontrollima, kas on sama t2ht


    //console.log('Key press END . . .');
}

function getDataFromDb(){
  ref.once('value', getData, errData);
}

function updateCount(){

  console.log('saving... ', pressedLetters);

  for(var i = 0; i < pressedLetters.length; i++){
    var pressed = pressedLetters[i];
    pressed = pressed.toString();
    if (letters && letters[pressed.hashCode()]) {

      letters[pressed.hashCode()].count++;

      count = letters[pressed.hashCode()].count;

    } else {
      count = 1;
      if(!letters){letters = [];}
      letters[pressed.hashCode()] = {
        key: pressed,
        count: count
      };
    }

    database.ref('statistics/' + pressed.hashCode()).set({
        key: pressed,
        count: count
    });

  }

  pressedLetters = [];

}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
