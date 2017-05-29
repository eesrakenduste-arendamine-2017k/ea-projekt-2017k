var name;
var description;
var picture;
var username = "OssuBoys";
var trainingID;
var exercise = "harjutus1";
var nr = 1;
var exerciseNR = 1;
function saveTraining(){
    trainingID = document.getElementById('trainingID').value;
    name = document.getElementById('exercise').value;
    description = document.getElementById('description').value;
    //picture = document.getElementById('image').value;
    saveToDatabase();
    clean();
    console.log("salvestatud");
    nr += 1;
    exercise = "harjutus"+nr;
    console.log(exercise);

    document.body.style.background = "blue";
      window.setTimeout(function () {
          document.body.style.background = "white";
                }, 100);
   }


function saveTrainingLast(){
    name = document.getElementById('exercise').value;
    description = document.getElementById('description').value;
    //picture = document.getElementById('image').value;
    saveToDatabase();
    clean();
    console.log("salvestatud");
    window.location.href='ready.html';
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
