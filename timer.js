//Kutsub funktsioonid välja kui lehe laadimisel.
function init() {
  addMessageListeners();
  startTimer();


 }
 //Saadab backgroundi teate, et ta timeri tööle paneks:
 function startTimer(){
	 chrome.runtime.sendMessage({
		 "command": "startTimer"
	 }, function(response) {
				console.log(response.message);
			});

 }

 //Lisab kuulajad, et timer.js teaks kuidas käituda backgroundi teadetega.
 function addMessageListeners(){
   chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
       if(request.command === "updateTime") {
         var time = request.time;
        document.getElementById('current-time').innerText = time;
       }

   });
 }


 document.addEventListener('DOMContentLoaded', init);
