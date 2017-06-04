var username;

window.onload = function(){
  getName();
  checkConnection();
  setTimeout(function checkConnection(){
    setTimeout(checkConnection, 10000);
  });
};

function checkConnection(){

    if(navigator.onLine===true) {
      console.log("ühendus olemas!");
      setTimeout(checkConnection, 10000);
    } else {
      alert("Interneti ühendus puudub!");
      setTimeout(checkConnection, 10000);
    }

}

function getName(){
    doEffect();
    username = location.search.substring(10);
    console.log(username);
    //siia võiks lisada veel, et ütleb olenevalt kellaajast tere hommikust/õhtut
    document.getElementById("sayHello").innerHTML = "Tere "+username;
}

function doEffect(){
  document.querySelector('.homepage').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.homepage').style.display = 'block';
}, 1000);
}
