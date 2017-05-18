
var mondayTasks=[JSON.parse(localStorage.getItem("monday"))];
var tuesdayTasks=[JSON.parse(localStorage.getItem("tuesday"))];
var wednesdayTasks=[JSON.parse(localStorage.getItem("wednesday"))];
var thursdayTasks=[JSON.parse(localStorage.getItem("thursday"))];
var fridayTasks=[JSON.parse(localStorage.getItem("friday"))];
var saturdayTasks=[JSON.parse(localStorage.getItem("saturday"))];
var sundayTasks=[JSON.parse(localStorage.getItem("sunday"))];


window.onload=function(){
	document.getElementById("div1task").innerHTML=JSON.parse(localStorage.getItem("monday"));
	document.getElementById("div2task").innerHTML=JSON.parse(localStorage.getItem("tuesday"));	
	document.getElementById("div3task").innerHTML=JSON.parse(localStorage.getItem("wednesday"));
	document.getElementById("div4task").innerHTML=JSON.parse(localStorage.getItem("thursday"));
	document.getElementById("div5task").innerHTML=JSON.parse(localStorage.getItem("friday"));
	document.getElementById("div6task").innerHTML=JSON.parse(localStorage.getItem("saturday"));
	document.getElementById("div7task").innerHTML=JSON.parse(localStorage.getItem("sunday"));
}

function addToDo1(){
	if(!mondayTasks || mondayTasks.length===0){
        mondayTasks=[];
    }
	if(document.getElementById("task1").value!==null && document.getElementById("task1").value!==""){
		mondayTasks.push("<li>"+document.getElementById("task1").value+"</li>");
		localStorage.setItem("monday", JSON.stringify(mondayTasks));
	} else if(document.getElementById("task1").value==null || document.getElementById("task1").value=="") {
		return null;
	};
	document.getElementById("div1task").innerHTML=JSON.parse(localStorage.getItem("monday"));	
}

function addToDo2(){
	if(!tuesdayTasks || tuesdayTasks.length===0){
        tuesdayTasks=[];
    }
	if(document.getElementById("task2").value!==null && document.getElementById("task2").value!==""){
		tuesdayTasks.push("<li>"+document.getElementById("task2").value+"</li>");
		localStorage.setItem("tuesday", JSON.stringify(tuesdayTasks));	
	} else if(document.getElementById("task2").value==null || document.getElementById("task2").value=="") {
		return null;
	};
	document.getElementById("div2task").innerHTML=JSON.parse(localStorage.getItem("tuesday"));	
}

function addToDo3(){
	if(!wednesdayTasks || wednesdayTasks.length===0){
        wednesdayTasks=[];
    }
	if(document.getElementById("task3").value==null && document.getElementById("task3").value!==""){
		wednesdayTasks.push("<li>"+document.getElementById("task3").value+"</li>");
		localStorage.setItem("wednesday", JSON.stringify(wednesdayTasks));		
	} else if(document.getElementById("task3").value==null || document.getElementById("task3").value=="") {
		return null;
	};
	document.getElementById("div3task").innerHTML=JSON.parse(localStorage.getItem("wednesday"));	
}

function addToDo4(){
	if(!thursdayTasks || thursdayTasks.length===0){
        thursdayTasks=[];
    }
	if(document.getElementById("task4").value==null && document.getElementById("task4").value!==""){
		thursdayTasks.push("<li>"+document.getElementById("task4").value+"</li>");
		localStorage.setItem("thursday", JSON.stringify(thursdayTasks));	
	} else if(document.getElementById("task4").value==null || document.getElementById("task4").value=="") {
		return null;
	};
	document.getElementById("div4task").innerHTML=JSON.parse(localStorage.getItem("thursday"));	
}

function addToDo5(){
	if(!fridayTasks || fridayTasks.length===0){
        fridayTasks=[];
    }
	if(document.getElementById("task5").value==null && document.getElementById("task5").value!==""){
		fridayTasks.push("<li>"+document.getElementById("task5").value+"</li>");
		localStorage.setItem("friday", JSON.stringify(fridayTasks));		
	} else if(document.getElementById("task5").value==null || document.getElementById("task5").value=="") {
		return null;
	};
	document.getElementById("div5task").innerHTML=JSON.parse(localStorage.getItem("friday"));	
}

function addToDo6(){
	if(!saturdayTasks || saturdayTasks.length===0){
        saturdayTasks=[];
    }
	if(document.getElementById("task6").value==null && document.getElementById("task6").value!==""){
		saturdayTasks.push("<li>"+document.getElementById("task6").value+"</li>");
		localStorage.setItem("saturday", JSON.stringify(saturdayTasks));	
	} else if(document.getElementById("task6").value==null || document.getElementById("task6").value=="") {
		return null;
	};
	document.getElementById("div6task").innerHTML=JSON.parse(localStorage.getItem("saturday"));	
}

function addToDo7(){
	document.getElementById("div7task").innerHTML+="<li>"+document.getElementById("ylesanne7").value+"</li>";	
	if(!sundayTasks || sundayTasks.length===0){
        sundayTasks=[];
    }
	if(document.getElementById("task7").value==null && document.getElementById("task7").value!==""){
		sundayTasks.push("<li>"+document.getElementById("task7").value+"</li>");
		localStorage.setItem("sunday", JSON.stringify(sundayTasks));	
	} else if(document.getElementById("task7").value==null || document.getElementById("task7").value=="") {
		return null;
	};
	document.getElementById("div7task").innerHTML=JSON.parse(localStorage.getItem("sunday"));	
}


function openList(id) {
    var list = document.getElementById(id);

    if (list.style.display == "none"){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }
}


