//Kutsub funktsioonid välja kui lehe laadimisel.
function init() {
  addOnClick();
  addMessageListeners();
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
       switch(request.command) {
 			case "updateTime":
 				document.getElementById("current-time").innerText = request.time;
 				break;
 			case "timerEnded":
 				console.log("Timer ended.");
 				break;
 		}

   });

 }
 function addOnClick() {
   document.getElementById("start").onclick = function() {
     startTimer();
   }
 }


 document.addEventListener('DOMContentLoaded', init);
