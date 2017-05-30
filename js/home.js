window.onload = getName;
var username;

function getName(){
    username = location.search.substring(10);
    console.log(username);
    //siia võiks lisada veel, et ütleb olenevalt kellaajast tere hommikust/õhtut
    document.getElementById("sayHello").innerHTML = "Tere "+username;
}
