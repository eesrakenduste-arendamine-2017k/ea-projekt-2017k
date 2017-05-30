window.onload = getName;
var username;

function getName(){
    username = location.search.substring(10);
    console.log(location);
    //siia võiks lisada veel, et ütleb olenevalt kellaajast tere hommikust/õhtut
}

function sendname(){
    schedulename = document.getElementById('schedulename').value;
    location.href = 'new_schedule.html?username='+username+'&schedulename='+schedulename;
}