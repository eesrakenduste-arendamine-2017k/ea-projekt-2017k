//https://www.w3schools.com/bootstrap/bootstrap_ref_js_scrollspy.asp
$(document).ready(function(){
	$('body').scrollspy({target: ".navbar", offset: 50});   
	// Add smooth scrolling on all links inside the navbar
	$("#theNavigation a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});	
		} 
	});
});
			
			
// user scrolls down, show the button
function scrollFunction() {
	if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}

// user clicks on the button, scroll to the top
function topFunction() {
	document.body.scrollTop = 0 ;
}
			