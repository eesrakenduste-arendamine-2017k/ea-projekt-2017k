var a;
var username;
var password;
var password1;
var firstname;
var surename;
var birthdate;
var weight ;
var t;

window.onload = function(){
    document.querySelector('.allfields_error').style.display = 'none';
    document.querySelector('.textfields_error').style.display = 'none';
    document.querySelector('.username_error').style.display = 'none';
    document.querySelector('.password_error').style.display = 'none';
    document.querySelector('.sk-circle').style.display = 'none';
    document.querySelector('.signup').style.display = 'block';
};

function saveusers(){
    //doEffect();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    password1 = document.getElementById('password1').value;
    firstname = document.getElementById('firstname').value;
    surename = document.getElementById('surename').value;
    birthdate = document.getElementById('birthdate').value;
    weight = document.getElementById('weight').value;
    //checkUsername();
    //setTimeout(saveUser, 2000);
    //saveUser();
    if(username !== '' && password !== '' && password1 !== '' && firstname !== '' && surename !== '' && birthdate !== '' && weight !== ''){
      saveUser();
    }else{
       allfieldsError();
    }
}


function saveUser(){

    if((isNaN(username)===true) && (isNaN(password)===true) && (isNaN(password1)===true) && (isNaN(firstname)===true) && (isNaN(surename)===true) && (isNaN(birthdate)===true)){
      console.log("Kõik tekstiväljad on teksti kujul");
  if(password==password1){
        doEffect();
        writeUserData(username, password, firstname, surename, birthdate, weight);
        setTimeout(function(){window.location.href= 'reg_login.html';}, 2000);
        console.log("Kasutaja salvestamine õnnestus");
        //clearTimeout(t);
    }else{
      passwordError();
    }
  }else{
    textfieldsError();
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



function doEffect(){
  document.querySelector('.signup').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 /*t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.signup').style.display = 'block';
  saveUser();
}, 3000);*/

}


function usernameError(){
  console.log("Selline kasutaja juba olemas");
  document.querySelector('.allfields_error').style.display = 'none';
  document.querySelector('.textfields_error').style.display = 'none';
  document.querySelector('.password_error').style.display = 'none';
  document.querySelector('.username_error').style.display = 'block';
}

function passwordError(){
  console.log("Paroolid pole sama");
  document.querySelector('.allfields_error').style.display = 'none';
  document.querySelector('.textfields_error').style.display = 'none';
  document.querySelector('.username_error').style.display = 'none';
  document.querySelector('.password_error').style.display = 'block';
}

function textfieldsError(){
  document.querySelector('.allfields_error').style.display = 'none';
  document.querySelector('.username_error').style.display = 'none';
  document.querySelector('.password_error').style.display = 'none';
  document.querySelector('.textfields_error').style.display = 'block';
}

function allfieldsError(){
  document.querySelector('.textfields_error').style.display = 'none';
  document.querySelector('.username_error').style.display = 'none';
  document.querySelector('.password_error').style.display = 'none';
  document.querySelector('.allfields_error').style.display = 'block';
}
