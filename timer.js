
function init() {
startTimer();

 }
 function startTimer(){
	 chrome.runtime.sendMessage({"command": "startTimer"},
	  	function(response){
				console.log(response.message);
			});

 }


 document.addEventListener('DOMContentLoaded', init);
