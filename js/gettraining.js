var username;
var trainingID;
var exercise = "harjutus1";
var i = 0;
var n = 1;
var excount = 0;
var exarray;
var exnames;
var exname = "harjutus1";
var exnrsave = 1;
var exnr;
var starttime;
var endtime;
var totaltime = 0;
var arrayi = 0;
var arrayrepmain = new Array();
var arrayweightmain = new Array();
var date;
window.onload = getinfo;
var c, o,arraylength;


var setsavenr = 1;
var arrayrep = new Array();
var arrayweight = new Array();

var arrayexname = "harjutus1";


function makearray(){
    
    var arrayrepset1 = document.getElementById("rep1_x").value;
    var arrayweightset1 = document.getElementById("set1weight").value;
    var arrayrepset2 = document.getElementById("rep2_x").value;
    var arrayweightset2 = document.getElementById("set2weight").value;
    var arrayrepset3 = document.getElementById("rep3_x").value;
    var arrayweightset3 = document.getElementById("set3weight").value; 
    //console.log(arrayi); 
   
    /*arrayrep[0][0] = arrayrepset1;
    arrayweight[0][0] = arrayweightset1;
    arrayrep[0][1] = arrayrepset2;
    arrayweight[0][1] = arrayweightset2;
    arrayrep[0][2] = arrayrepset3;
    arrayweight[0][2] = arrayweightset3;
    console.log(arrayrep);
    console.log(arrayweight);*/
    arrayrep[0] = arrayrepset1;
    arrayweight[0] = arrayweightset1;
    arrayrep[1] = arrayrepset2;
    arrayweight[1] = arrayweightset2;
    arrayrep[2] = arrayrepset3;
    arrayweight[2] = arrayweightset3;
    //arrayrepmain.push.apply(arrayrepmain, arrayweight);
    arrayrepmain.push(arrayrep);
    arrayweightmain.push(arrayweight);
    console.log(arrayrepmain);
    console.log(arrayweightmain);
    arraylength++;
    arrayrep = [];
    arrayweight = [];
   
}

function saveworkout(){
  console.log("salvestab "+arrayrepmain.length);
  for (c = 0; c < arrayrepmain.length; c++) { 
    for (o = 0; o < 3; o++) { 
      console.log("REP: "+arrayrepmain[c][o]);
      console.log("WEIGHT: "+arrayweightmain[c][o]);
    firebase.database().ref("TrainingDone/"+username+"/"+trainingID+"/"+date+"/"+exnrsave+"/"+setsavenr).set({
    Reps: arrayrepmain[c][o],
    Weight: arrayweightmain[c][o],
  });
  //setTimeout(function(){console.log("Ül: "+setsavenr);}, 1000);
      //saveToDatabase();
      setsavenr++;
    }
    setsavenr = 1;
    exnrsave++;
  }
}

function getinfo(){
    date = new Date();
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
  if(exname != "harjutus1"){
    makearray();
  }
  
  doEffect();
    //siis kui harjutused on tehtud
    if(excount>exnr){
        caltotaltime();
        saveworkout();
        //SALVESTA
        console.log("tehtud");
        window.location.href='trainign_finish.html?username='+username+'&totaltime='+totaltime;
        //setTimeout(function(){window.location.href='trainign_finish.html?username='+username+'&totaltime='+totaltime;}, 2000);
    }else{
    var Name = exarray[exname].Name;
    document.getElementById('exercise').value = Name;
    //console.log(Name);
    n += 1;
    exname = "harjutus"+n;
    //console.log(exname);
    excount += 1;
    }
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
