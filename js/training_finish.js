var username;
window.onload = function(){
  username = location.search.substring(10);
  var content = document.getElementsByClassName('finish')[0];
  content.innerHTML += "<h1>Tubli töö "+username+" </h1>";
};
