window.addEventListener("DOMContentLoaded", function(){
	firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		document.getElementById('tasks-view').style.display = 'block';
	} else {
		document.getElementById('tasks-view').style.display = 'none';
	}
	});
});