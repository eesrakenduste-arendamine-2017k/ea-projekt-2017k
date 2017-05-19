//Function to save data to DB
function saveToDB(){

  var d_date = document.getElementById('due_date').value;
  var task = document.getElementById('task').value;

  if(d_date === null || d_date === "" || task === "" || task === null){

    console.log("No task or due date was specified");
    return;

  } else {

    var user = firebase.auth().currentUser;
    var uid;

    if(user !== null){

      uid = user.uid;

      firebase.database().ref("UserTasks/"+ uid +"/").push({
        Task: task,
        Due: d_date
      });

      console.log(task, d_date);
      clearFields();

    } else {
      console.log("You are not logged in!");
    }

  }

}

//Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log("You are logged in");
  } else {
    console.log("You are not logged in");
  }
});

function LogOut(){
  firebase.auth().signOut();
}

//Function for logging in
function LogIn(){

  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  var authenticate = firebase.auth();

  var promise = authenticate.signInWithEmailAndPassword(email, password);
  window.location.href="Index.html";

}

//Function for creating accounts
function SignUp(){

  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  var auth = firebase.auth();

  var promise = auth.createUserWithEmailAndPassword(email, password);
  window.location.href="Index.html";

}

//Function to clear fields after every successful entry
function clearFields(){

  document.getElementById('due_date').value = "";
  document.getElementById('task').value = "";

}
