 //var database = firebase.database();
var a;
var username;
var password;
var password1;
var firstname;
var surename;
var birthdate;
var weight ;

function saveuser(){
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    password1 = document.getElementById('password1').value;
    firstname = document.getElementById('firstname').value;
    surename = document.getElementById('surename').value;
    birthdate = document.getElementById('birthdate').value;
    weight = document.getElementById('weight').value;
    checkUsername();
    setTimeout(saveUser, 2000);

}

function saveUser(){
  //console.log("a="+a);
  if(password==password1){
      if(a == 'OK'){
        writeUserData(username, password, firstname, surename, birthdate, weight);
        console.log("Kasutaja salvestamine õnnestus");
        document.body.style.background = "blue";
          window.setTimeout(function () {
              document.body.style.background = "white";
                    }, 100);
      }else{
        console.log("Selline kasutaja juba olemas");
      }
    }else{
      console.log("Paroolid pole sama");
    }
}
function writeUserData(username, password, firstname, surename, birthdate, weight, id) {
  firebase.database().ref("userinfo/"+username).set({
    Username: username,
    Password: password,
    Firstname: firstname,
    Surename: surename,
    Birthdate: birthdate,
    Weight: weight,
    Date: Date()
  });
}

function checkUsername(){
    console.log("kasutaja kontroll");
    username = document.getElementById("username").value;
    firebase.database().ref("userinfo").child(username).once('value', function(snapshot) {
        if(snapshot.exists()){
            a = "x";
            console.log("olemas");
        }else{
            a = "OK";
            console.log("ei ole olemas");
        }
    });
}

function getInfo(){
    var user = document.getElementById("user").value;
    firebase.database().ref("userinfo").child(user).once('value', function(snapshot) {
        if(snapshot.exists()){
            s = snapshot.val().Weight;
        }else{
            s = "puudub";
        }
    document.getElementById('value').innerHTML = s;
    });
}
