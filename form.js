var formId1 = document.getElementById("form1");
var formId2 = document.getElementById("form2");
var formId3 = document.getElementById("form3");

var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");

formId2.style.visibility = "hidden";
formId3.style.visibility = "hidden";

document.addEventListener("click", function(e) {
	var click = e.target.id;
	console.log(click);
	
	switch(click) {
    case "submit1":
        formId1.style.visibility = "hidden";
        formId2.style.visibility = "visible";
		step2.className += " active";
		
        break;
    case "submit2":
        formId2.style.visibility = "hidden";
        formId3.style.visibility = "visible";
		step3.className += " active";
        break;
		case "submit3":
      
        break;
    //default:
    //    code block
}
});