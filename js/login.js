var username;
var password;
var a;
var databasepassword;


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
                console.log("Parool õige");
                location.href = 'home.html?username='+username;
            }else{
                console.log("Parool vale");
                alert("Viga kasutajanimes ja/või paroolis");
            }
        }else{
            a = "ERROR";
            console.log(" Kasutajat ei ole olemas");
            alert("Viga kasutajanimes ja/või paroolis");
        }
    });
}
