function BreakState() {
	this.length = function() {
		return localStorage["break-selection"] || 5;
	};
	this.delay = 5;
	this.html = "timer.html";
	this.opt = {
		type: "basic",
		title: "Paus sai läbi!",
		message: "On aeg uuesti tööle hakata, töö aeg algab 5 minuti pärast.",
		iconUrl: "ikoon.png"
	};
	this.notificationBaseId = "breakOver";
	this.nextState = "pomodoro";
}
