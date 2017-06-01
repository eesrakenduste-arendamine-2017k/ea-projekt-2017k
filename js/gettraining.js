var username;
var trainingID;
var exercise = "harjutus1"
var i = 0;  
var n = 1;
var excount = 0;
var exarray;
var exnames;
var exname="harjutus1";
var exnr;
window.onload = getinfo;

function getinfo(){
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




function getex(){

    var exname = exnames[i];
    if(exname===undefined){
        window.location.href = 'trainign_finish.html';
    }
    console.log(exname);
    var Description = exarray[exname].Description;
    var Name = exarray[exname].Name;
    document.getElementById('exercise').value = Description;
    document.getElementById('description').value = Name;
    console.log(Description, Name);
    i += 1;
}

function sgotData(data){
    exarray = data.val();
    //console.log(exarray);
    exnames = Object.keys(exarray);
    //console.log(exnames);
    for (i = 0; i < exnames.length; i++) {
        var exname = exnames[i];
        console.log(exname);
        var Description = exarray[exname].Description;
        var Name = exarray[exname].Name;
        console.log(Description, Name);
    }
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
    //siis kui harjutused on tehtud
    if(excount>exnr){
        console.log("tehtud");
        window.location.href='ready.html';
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