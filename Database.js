window.addEventListener('DOMContentLoaded', function(){
	
	//Realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		GetData();
	  } else {
		
	  }
	});
	
});

//Function to get user tasks
function GetData(){
	var user = firebase.auth().currentUser;
	var user_id;
		
	if(user !== null){
		user_id = user.uid;
		var rootRef = firebase.database().ref('UserTasks').child(user_id).orderByChild('Status').equalTo('Not Completed');;
		rootRef.on('value', function(snapshot){
			
			//Removing table row regeneration
			var table_rows = document.querySelectorAll('#table_row');
			for(i = 0; i < table_rows.length; i++){
			  table_rows[i].remove();
			}
			
			var data = snapshot.val();
			
			//Early return since user has not saved any tasks
			if(data === null){
				return;
			}
			
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
				t_row.appendChild(td1);
				t_row.appendChild(td2);
				t_row.appendChild(td3);

				td1.innerHTML += task;
				td2.innerHTML += due_date;
				
				var td3_content1 = document.createElement('button');
				td3_content1.setAttribute('id', "tick_button");
				td3_content1.setAttribute('type', "button");
				td3_content1.className = "btn btn-success btn-sm";

				var td3_content2 = document.createElement('span');
				td3_content2.className = "glyphicon glyphicon-ok";
				
				td3_content1.appendChild(td3_content2);
				td3.appendChild(td3_content1);
				
				var done_buttons = document.querySelectorAll("#tick_button");
				done_buttons[i].addEventListener('click', tickTask.bind(null, k), false);
				
			}
		});
	} else {
		//404 not found
	}
}

//Function to remove completed tasks
//Does not remove data from the database
function tickTask(task_key){
	
	var user = firebase.auth().currentUser;
	
	if(user !== null){
		
		var user_id = user.uid;
		var taskRef = firebase.database().ref('UserTasks').child(user_id).child(task_key);
		
		taskRef.update({
			Status : "Completed"
		});
		
	}
	
}	