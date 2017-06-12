function PomodoroState() {
	this.length = function() {
		return localStorage["pomodoro-selection"] || 5;
	}
	this.delay = 5;
	this.html = "timer.html";
	this.opt = {
		type: "basic",
		title: "Aeg pausiks!",
		message: "Aeg pausiks, et saaksid silmi puhata. Paus algab 5 minuti pärat, võid hakata otsi kokku tõmbama.",
		iconUrl: "ikoon.png"
	};
	this.notificationBaseId = "pomodoroOver";
	this.nextState = "break";
}
