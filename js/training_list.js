var username;
var exnames;
window.onload = function(){
      doEffect();
      // käivitame siis kui lehte laeme
      console.log('>>>>loend');
      username = location.search.substring(10);
      console.log(username);
      getTraining();
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
    //exnames.toString();
    var content = document.getElementsByClassName('list-of-schedules')[0];
    for (var i = 0; i < exnames.length; i++) {
      content.innerHTML += "<a href='do_schedule.html?username="+username+"&exercise="+exnames[i]+"'>"+exnames[i]+"</a>"+"<br>";

    }


}


   function doEffect(){
     document.querySelector('.list-of-schedules').style.display = 'none';
    document.querySelector('.sk-circle').style.display = 'block';
    t = setTimeout(function(){
      printTrainings();
      document.querySelector('.sk-circle').style.display = 'none';
     document.querySelector('.list-of-schedules').style.display = 'block';
  }, 1000);
   }
