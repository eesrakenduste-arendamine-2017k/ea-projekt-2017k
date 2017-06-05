//KATSETUS
//Realtime listener
window.addEventListener("DOMContentLoaded", function(){
	firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log("You are logged in");
		document.querySelector('.form-group').style.visibility = 'hidden';
		document.getElementById('logout').style.visibility = 'visible';
	} else {
		console.log("You are not logged in");
		document.querySelector('.form-group').style.visibility = 'visible';
		document.getElementById('logout').style.visibility = 'hidden';
	}
	});
});