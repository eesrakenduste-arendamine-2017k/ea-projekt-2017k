window.addEventListener("DOMContentLoaded", function(){
	firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		document.getElementById('tasks-view').style.visibility = 'visible';
	} else {
		document.getElementById('tasks-view').style.visibility = 'hidden';
	}
	});
});