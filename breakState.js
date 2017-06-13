function BreakState() {
 	this.length = 10;
 	this.delay = 10;
 	this.html = "timer.html";
 	this.opt = {
 		type: "basic",
 		title: "Paus sai läbi!",
 		message: "Töö aeg algab 10 sekundi pärast!",
 		iconUrl: "ikoon.png"
 	};
 	this.notificationBaseId = "breakOver";
  this.nextState = 1;
 }
