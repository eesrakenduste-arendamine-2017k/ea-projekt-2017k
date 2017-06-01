var username;
var trainingID;
var exercise = "harjutus1";
var i = 0;
var n = 1;
var excount = 0;
var exarray;
var exnames;
var exname="harjutus1";
var exnr;
var starttime;
var endtime;
var totaltime = 0;
window.onload = getinfo;

function getinfo(){
    doEffect();
    starttimer();
    var a = location.search.substring(1);
    var b = a.split(/&/);
    trainingID = decodeURIComponent(b[1].substring(9));
    username = decodeURIComponent(b[0].substring(9));
    console.log(trainingID, username);
    getTraining();
    document.getElementById("rep1_minus").addEventListener("click", rep1Minus);
    document.getElementById("rep2_minus").addEventListener("click", rep2Minus);
    document.getElementById("rep3_minus").addEventListener("click", rep3Minus);
    document.getElementById("rep1_plus").addEventListener("click", rep1Plus);
    document.getElementById("rep2_plus").addEventListener("click", rep2Plus);
    document.getElementById("rep3_plus").addEventListener("click", rep3Plus);
}

function getTraining(){

    firebase.database().ref("Trainings/"+username+"/"+trainingID).once('value', gotData);
}

function sgotData(data){
    exarray = data.val();
    console.log(exarray);
    exnames = Object.keys(exarray);
    console.log(exnames);
}


function starttimer(){
  starttime = performance.now();
}

function endtimer(){
  endtime = performance.now();
}

function caltotaltime(){
  endtimer();
  totaltime = endtime - starttime;
  console.log(totaltime);
}


function gotData(data){
    exarray = data.val();
    /*var Name = exarray[exname].Name;
    console.log(Name);
    n += 1;
    exname = "harjutus"+n;*/
    exnames = Object.keys(exarray);
    exnr = exnames.length;
    //console.log(exnr);
    excount += 1;
    getnextex();
}

function getnextex(){
  doEffect();
    //siis kui harjutused on tehtud
    if(excount>exnr){
        caltotaltime();
        console.log("tehtud");
        window.location.href='trainign_finish.html?username='+username+'&totaltime='+totaltime;
    }
    var Name = exarray[exname].Name;
    document.getElementById('exercise').value = Name;
    //console.log(Name);
    n += 1;
    exname = "harjutus"+n;
    //console.log(exname);
    excount += 1;
}


rep1Minus = function(){
  var currentValue = parseInt(document.getElementById("rep1_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep1_x").value = newValue;
};

rep2Minus = function(){
  var currentValue = parseInt(document.getElementById("rep2_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep2_x").value = newValue;
};

rep3Minus = function(){
  var currentValue = parseInt(document.getElementById("rep3_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep3_x").value = newValue;
};

rep1Plus = function(){
  var currentValue = parseInt(document.getElementById("rep1_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep1_x").value = newValue;
};

rep2Plus = function(){
  var currentValue = parseInt(document.getElementById("rep2_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep2_x").value = newValue;
};

rep3Plus = function(){
  var currentValue = parseInt(document.getElementById("rep3_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep3_x").value = newValue;
};

function doEffect(){
  document.querySelector('.schedulepage').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.schedulepage').style.display = 'block';
}, 1000);
}
