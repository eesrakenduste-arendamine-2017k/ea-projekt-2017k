var username;
var password;
var a;
var databasepassword;

window.onload = function(){
      document.querySelector('.login_error').style.display = 'none';
      document.querySelector('.empty_error').style.display = 'none';
      doEffect();
   };


function login(){
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    checkUsername();
}

function checkUsername(){
    if(username !== "" || password !== ""){
    firebase.database().ref("userinfo").child(username).once('value', function(snapshot) {
        if(snapshot.exists()){
            a = "OK";
            console.log("Kasutaja on olemas");
            databasepassword = snapshot.val().Password;
            if(databasepassword == password){
                document.querySelector('.login_error').style.display = 'none';
                console.log("Parool õige");
                location.href = 'home.html?username='+username;
            }else{
                console.log("Parool vale");
                document.querySelector('.login_error').style.display = 'block';
            }
        }else{
            a = "ERROR";
            console.log(" Kasutajat ei ole olemas");
            document.querySelector('.empty_error').style.display = 'none';
            document.querySelector('.login_error').style.display = 'block';

        }
    });
  } else {
    console.log("Väljad tühjad");
    document.querySelector('.empty_error').style.display = 'block';
    document.querySelector('.login_error').style.display = 'none';
  }
}

function doEffect(){
  document.querySelector('.login').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.login').style.display = 'block';
}, 1000);
}
