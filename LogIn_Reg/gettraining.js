var username = "OssuBoys";
var trainingID = "ternn2";
var exercise = "harjutus1"
var i = 0;  
var exarray;
var exnames;

function getTraining(){

    firebase.database().ref("Trainings/OssuBoys/Rinnatrenn").once('value', gotData);    
}

function gotData(data){
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
        //console.log(exname);
        var Description = exarray[exname].Description;
        var Name = exarray[exname].Name;
        console.log(Description, Name);
    }
}