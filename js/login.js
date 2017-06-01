var username;
var password;
var a;
var databasepassword;

window.onload = function(){
      document.querySelector('.login_error').style.display = 'none';
      doEffect();
   };


function login(){
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    checkUsername();
}

function checkUsername(){
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
            alert("Viga kasutajanimes ja/või paroolis");
        }
    });
}

function doEffect(){
  document.querySelector('.loginpage').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';
 t = setTimeout(function(){
   document.querySelector('.sk-circle').style.display = 'none';
  document.querySelector('.loginpage').style.display = 'block';
}, 1000);
}
