window.addEventListener('DOMContentLoaded', function(){
	
	//Realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		console.log("You are logged in");
		GetData();
	  } else {
		console.log("You are not logged in");
	  }
	});
	
});

//Function to get user tasks
function GetData(){
	var user = firebase.auth().currentUser;
	var user_id;
		
	if(user !== null){
		user_id = user.uid;
		var rootRef = firebase.database().ref('UserTasks').child(user_id);
		rootRef.on('value', function(snapshot){
			
			//Removing table row regeneration
			var table_rows = document.querySelectorAll('#table_row');
			for(i = 0; i < table_rows.length; i++){
			  table_rows[i].remove();
			}
			
			var data = snapshot.val();
			var keys = Object.keys(data);
			var table = document.getElementById('tasksTable');
			
			for(i = 0; i < keys.length; i++){
				var k = keys[i];
				var task = data[k].Task;
				var due_date = data[k].Due;
				
				var t_row = document.createElement('tr');
				t_row.setAttribute("id", "table_row");
				table.appendChild(t_row);

				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var td4 = document.createElement('td');
				t_row.appendChild(td1);
				t_row.appendChild(td2);
				t_row.appendChild(td3);
				t_row.appendChild(td4);

				td1.innerHTML += task;
				td2.innerHTML += due_date;
				
				var td4_content1 = document.createElement('button');
				td4_content1.setAttribute('id', "delete_button");
				td4_content1.setAttribute('type', "button");
				td4_content1.className = "btn btn-danger btn-sm";

				var td4_content2 = document.createElement('span');
				td4_content2.className = "glyphicon glyphicon-trash";

				td4_content1.appendChild(td4_content2);
				td4.appendChild(td4_content1);
				
			}
		});
	} else {
		//404 not found
	}
}	