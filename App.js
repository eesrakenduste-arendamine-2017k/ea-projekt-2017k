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