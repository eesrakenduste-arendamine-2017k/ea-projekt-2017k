var formId1 = document.getElementById("form1");
var formId2 = document.getElementById("form2");
var formId3 = document.getElementById("form3");

var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");

formId2.style.visibility = "hidden";
formId3.style.visibility = "hidden";
if (localStorage.getItem("answer2") !== null){
	document.getElementById("transportId").value = localStorage.getItem("answer2");
}
document.addEventListener("click", function(e) {
	var click = e.target.id;
	//console.log(click);
	// siis kui kasutaja vajutab edasi või tagasi nuppe formis
	switch(click) {
    case "forward1":
        formId1.style.visibility = "hidden";
        formId2.style.visibility = "visible";
		step2.className += " active";
        break;
    case "forward2":
        formId2.style.visibility = "hidden";
        formId3.style.visibility = "visible";
		step3.className += " active";
        break;
	case "forward3":
		localStorage.clear();
        break;
	case "back2":
        formId2.style.visibility = "hidden";
        formId1.style.visibility = "visible";
		step2.className -= " active";
        break;
	case "back3":
        formId3.style.visibility = "hidden";
        formId2.style.visibility = "visible";
		step3.className += " active";
		step3.className -= " active";
        break;
	case "answer2":
        localStorage.setItem("answer2", e.target.value);
        break;	
    //default:
	}
	
});
var i = 1;

window.addEventListener('keypress', function(e) {
	//panen setTimeouti, sest muidu jääb alati üks täht lõpust ära, mida ei panda localStoragesse
	setTimeout(function(){
		   var active = document.activeElement;
		//console.log("vajutasid");
		//console.log(active.value.length);
		
		
		if(active.className == "answer") {
			localStorage.setItem(active.id, active.value);
		//console.log(localStorage.getItem(active.id));
		} 
    }, 1000);
	

});

//võtab localStoragest väärtused igale fieldile, kui eksisteerib 
var named = document.getElementById("wrapper"); 
var tags = named.getElementsByTagName("input");
for (var i = 0, n = tags.length; i < n; i = i + 1) {
   tags[i].value = localStorage.getItem(tags[i].id);
}













/*for(var t=0; t < document.getElementsByTagName("form").length; t++){
	for(var y=0; y < document.getElementsByTagName("form")[t].getElementsByTagName("input").length; y++){
		document.getElementsByTagName("form")[y].getElementsByTagName("input")[y].value = localStorage.getItem(document.getElementsByTagName("form")[y].getElementsByTagName("input")[y].id);
	}
	y=0;
}*/
/*var q = 0;
var b = 0
while (document.getElementsByTagName("form")[q] !== undefined) {
	console.log("tegin ühe suure ringi");
	while(document.getElementsByTagName("form")[q].getElementsByTagName("input") !== undefined){
		console.log(document.getElementsByTagName("form")[q].getElementsByTagName("input")[b].id);
		document.getElementsByTagName("form")[q].getElementsByTagName("input")[b].value = localStorage.getItem(document.getElementsByTagName("form")[q].getElementsByTagName("input")[b].id);
		b++;
	}
	b = 0;	
	q++;
}*/

/*
for(var t=0; t < document.getElementsByTagName("form").length; t++){
	for(var y=0; y < document.getElementsByTagName("form")[t].getElementsByTagName("input").length; y++){
			document.getElementsByTagName("form")[t].getElementsByTagName("input")[y].value = localStorage.getItem(document.getElementsByTagName("form")[y].getElementsByTagName("input")[y].id);
	}
	
}*/














