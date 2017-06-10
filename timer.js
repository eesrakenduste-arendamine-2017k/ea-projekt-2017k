function init() {
startTimer();
 }
function startTimer(){
	var start = moment();
	setInterval(function(){
		var diff = moment().diff(start, 'minutes');
		document.getElementById('current-time').innerText = diff;

	}, 60000);
}


 document.addEventListener('DOMContentLoaded', init);
