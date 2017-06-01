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