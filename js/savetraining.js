var name;
var description;
var picture;
var username;
var trainingID;
var exercise = "harjutus1";
var nr = 1;
var exerciseNR = 1;
var t;
//window.onload = gettrainingID;

window.onload = function(){
    document.querySelector('.sk-circle').style.display = 'none';
    document.querySelector('.saving').style.display = 'block';
    gettrainingID();
    checkConnection();
    setTimeout(function checkConnection(){
      setTimeout(checkConnection, 10000);
    });
};

function checkConnection(){

    if(navigator.onLine===true) {
      //console.log("ühendus olemas!");
      setTimeout(checkConnection, 10000);
    } else {
      alert("Interneti ühendus puudub!");
      setTimeout(checkConnection, 10000);
    }

}

function gettrainingID(){
    var a = location.search.substring(1);
    //console.log(a);
    var b = a.split(/&/);
    //console.log(b);
    //console.log(location);

    //decodeURIComponent tegel täpitähtede convertimisega
    trainingID = decodeURIComponent(b[1].substring(13));
    username = decodeURIComponent(b[0].substring(9));
    console.log(trainingID, username);
    console.log(username);
    document.getElementById("trainingID").value = trainingID;

}
function saveTraining(){
    //trainingID = document.getElementById('trainingID').value;
    name = document.getElementById('exercise').value;
    description = document.getElementById('description').value;
    //picture = document.getElementById('image').value;
    saveToDatabase();
    clean();
    console.log("salvestatud");
    nr += 1;
    exercise = "harjutus"+nr;
    console.log(exercise);
    doEffect();
   }


   function doEffect(){
     document.querySelector('.saving').style.display = 'none';
    document.querySelector('.sk-circle').style.display = 'block';
    t = setTimeout(function(){
      document.querySelector('.sk-circle').style.display = 'none';
     document.querySelector('.saving').style.display = 'block';
  }, 1000);
   }

function saveTrainingLast(){
    name = document.getElementById('exercise').value;
    description = document.getElementById('description').value;
    //picture = document.getElementById('image').value;
    saveToDatabase();
    clean();
    console.log("salvestatud");
    window.location.href="ready.html?username="+username+"&trainingID="+trainingID+"";
}

function saveToDatabase(){
    firebase.database().ref("Trainings/"+username+"/"+trainingID+"/"+exercise).set({
    Name: name,
    Description: description,
    //Picture: picture
  });
}

function clean(){
    exerciseNR += 1;
    document.getElementById('exerciseNR').value = exerciseNR;
    document.getElementById('exercise').value = "";
    document.getElementById('description').value = "";
    //document.getElementById('image').value = "";
}
