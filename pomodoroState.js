function PomodoroState() {
 	this.length = 10;
 	this.delay = 10;
 	this.html = "timer.html";
 	this.opt = {
 		type: "basic",
 		title: "Aeg pausiks!",
 		message: "Paus algab 10 sekundi pärast!",
 		iconUrl: "ikoon.png"
 	};
 	this.notificationBaseId = "pomodoroOver";
  this.nextState = 2;

 }
