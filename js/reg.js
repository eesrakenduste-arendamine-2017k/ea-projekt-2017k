 //var database = firebase.database();
var a;
var username;
var password;
var password1;
var firstname;
var surename;
var birthdate;
var weight ;
var t;

function saveuser(){
    doEffect();
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
  if(username !== '' && password !== '' && password1 !== '' && firstname !== '' && surename !== '' && birthdate !== '' && weight !== ''){
    console.log("T6hjasi v2ljasi ei ole");
    if((isNaN(username)===true) && (isNaN(password)===true) && (isNaN(password1)===true) && (isNaN(firstname)===true) && (isNaN(surename)===true) && (isNaN(birthdate)===true)){
      console.log("Kõik tekstiväljad on teksti kujul");
  if(password==password1){
      if(a == 'OK'){
        writeUserData(username, password, firstname, surename, birthdate, weight);
        console.log("Kasutaja salvestamine õnnestus");

          alert("Kasutaja loomine õnnestus !");
          window.location.href= 'login.html';
      }else{
        console.log("Selline kasutaja juba olemas");
        alert("Selline kasutaja on juba olemas!");
      }
    }else{
      console.log("Paroolid pole sama");
      alert("Paroolid peavad olema samad!");
    }
  }else{
    alert("Kasutajanimi, parool ja nimi peavad olema tekst!");
  }
  }else{
    alert("Täida kõik väljad!");
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

function doEffect(){
  document.querySelector('.signup').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.signup').style.display = 'block';
}, 2000);
}
