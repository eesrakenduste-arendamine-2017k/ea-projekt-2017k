var username;
var totaltime;
var convertedtime;
window.onload = function(){
  var a = location.search.substring(1);
  var b = a.split(/&/);
  username = decodeURIComponent(b[0].substring(9));
  totaltime = decodeURIComponent(b[1].substring(10));
  console.log(totaltime);
  secondstotime(totaltime);
  var content = document.getElementsByClassName('finish')[0];
  content.innerHTML += "<h1>Tubli töö "+username+" </h1>";
  content.innerHTML += "<h1>Aega läks: "+convertedtime+" </h1>";
};

function secondstotime(p){
        sec = Math.floor((p/1000) % 60);
        console.log(sec);
        var hours   = Math.floor(sec/ 3600);
        var minutes = Math.floor((sec - (hours * 3600)) / 60);
        var seconds = sec - (hours * 3600) - (minutes * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        convertedtime = hours+':'+minutes+':'+seconds;
        return convertedtime;
}