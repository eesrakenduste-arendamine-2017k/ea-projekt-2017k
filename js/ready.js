var username;
var trainingID;
window.onload = getinfo;
var exarray;
var exnames;

function getinfo(){
    doEffect();
    var a = location.search.substring(1);
    var b = a.split(/&/);
    trainingID = decodeURIComponent(b[1].substring(11));
    username = decodeURIComponent(b[0].substring(9));
    console.log(trainingID, username);
    getTraining();
}

function getTraining(){

    firebase.database().ref("Trainings/"+username+"/"+trainingID).once('value', gotData);
}

function gotData(data){
    exarray = data.val();
    console.log(exarray);
    exnames = Object.keys(exarray);
    //console.log(exnames);
    printTrainingName();
    printTrainings();
}

function printTrainingName(){
  var content1 = document.getElementsByClassName('kavaName')[0];
  content1.innerHTML += "<a>Kava:"+trainingID+"</a>"+" <hr>";
}

function printTrainings(){

    var content = document.getElementsByClassName('harjName')[0];
    for (var i = 0; i < exnames.length; i++) {
      var exname = exnames[i];
      var Name = exarray[exname].Name;
      console.log(Name);
      content.innerHTML += "<a>"+Name+"</a>"+"<br>";

    }

}

function doEffect(){
  document.querySelector('.content').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.content').style.display = 'block';
}, 2000);
}
