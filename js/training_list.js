var username;
var exnames;
window.onload = function(){
      // käivitame siis kui lehte laeme
      console.log('>>>>loend');
      username = location.search.substring(10);
      console.log(username);
      // peidan loendi ja näitan loading...
      document.querySelector('.list-of-schedules').style.display = 'none';
      document.querySelector('.loading').style.display = 'block';

      getTraining();

      //simulatsioon laeb kaua
      window.setTimeout(function(){

          // peidan loading... ja näitan loendit
          document.querySelector('.loading').style.display = 'none';
          document.querySelector('.list-of-schedules').style.display = 'block';
          printTrainings();
      }, 2000);
     //
    }

  function getTraining(){

    firebase.database().ref("Trainings/"+username).once('value', gotData);
}

function gotData(data){
    exarray = data.val();
    console.log(exarray);
    exnames = Object.keys(exarray);
    console.log(exnames);
}

function printTrainings(){
    exnames.toString();
    document.getElementById("training").innerHTML=exnames;
}
