var mondayTasks=JSON.parse(localStorage.getItem("monday")) || [];
var tuesdayTasks=JSON.parse(localStorage.getItem("tuesday")) || [];
var wednesdayTasks=JSON.parse(localStorage.getItem("wednesday")) || [];
var thursdayTasks=JSON.parse(localStorage.getItem("thursday")) || [];
var fridayTasks=JSON.parse(localStorage.getItem("friday")) || [];
var saturdayTasks=JSON.parse(localStorage.getItem("saturday")) || [];
var sundayTasks=JSON.parse(localStorage.getItem("sunday")) || [];

registerServiceWorker();

window.onload=function(){
	populateList('ollist1','monday');
	populateList('ollist2', 'tuesday');
	populateList('ollist3', 'wednesday');
	populateList('ollist4', 'thursday');
	populateList('ollist5', 'friday');
	populateList('ollist6', 'saturday');
	populateList('ollist7', 'sunday');
}	

var makeRemoveButtons = function(olId,day){
	var btn = document.createElement('button');
	btn.innerHTML = 'Kustuta viimane';
	btn.addEventListener('click', function(e){
		e.preventDefault();
		var monday = JSON.parse(localStorage.getItem(day));
		modifiedMonday = monday.slice(0,-1);
		localStorage.setItem(day, JSON.stringify(modifiedMonday))
		populateList(olId,day)
	})
	document.getElementById(olId).appendChild(btn);
}

var populateList = function(olId, day) {
	activeLi = document.getElementById(olId).getElementsByTagName('li')[1]
	activeLi.innerHTML="";	
	var mTasks = JSON.parse(localStorage.getItem(day));
	if(mTasks!==null){
		mTasks.forEach(function(singleTask){
			activeLi.innerHTML += "<li>"+singleTask+"</li>"+"<br>";
		});
	}
}
	
	
populateList('ollist1', 'monday');
makeRemoveButtons('ollist1','monday');

populateList('ollist2', 'tuesday');
makeRemoveButtons('ollist2','tuesday');

populateList('ollist3', 'wednesday');
makeRemoveButtons('ollist3','wednesday');

populateList('ollist4', 'thursday');
makeRemoveButtons('ollist4','thursday');

populateList('ollist5', 'friday');
makeRemoveButtons('ollist5','friday');

populateList('ollist6', 'saturday');
makeRemoveButtons('ollist6','saturday');

populateList('ollist7', 'sunday');
makeRemoveButtons('ollist7','sunday');
	
function addToDo1(){
	if(!mondayTasks || mondayTasks.length===0){
        mondayTasks=[];
    }
	if(document.getElementById("task1").value!==null && document.getElementById("task1").value!==""){
		mondayTasks.push(document.getElementById("task1").value);
		localStorage.setItem("monday", JSON.stringify(mondayTasks));
	} else if(document.getElementById("task1").value==null || document.getElementById("task1").value=="") {
		return null;
	};
	populateList('ollist1','monday');
}

function addToDo2(){
	if(!tuesdayTasks || tuesdayTasks.length===0){
        tuesdayTasks=[];
    }
	if(document.getElementById("task2").value!==null && document.getElementById("task2").value!==""){
		tuesdayTasks.push(document.getElementById("task2").value);
		localStorage.setItem("tuesday", JSON.stringify(tuesdayTasks));	
	} else if(document.getElementById("task2").value==null || document.getElementById("task2").value=="") {
		return null;
	};
	populateList('ollist2','tuesday');
}

function addToDo3(){
	if(!wednesdayTasks || wednesdayTasks.length===0){
        wednesdayTasks=[];
    }
	if(document.getElementById("task3").value!==null && document.getElementById("task3").value!==""){
		wednesdayTasks.push(document.getElementById("task3").value);
		localStorage.setItem("wednesday", JSON.stringify(wednesdayTasks));		
	} else if(document.getElementById("task3").value==null || document.getElementById("task3").value=="") {
		return null;
	};
	populateList('ollist3', 'wednesday');
}

function addToDo4(){
	if(!thursdayTasks || thursdayTasks.length===0){
        thursdayTasks=[];
    }
	if(document.getElementById("task4").value!==null && document.getElementById("task4").value!==""){
		thursdayTasks.push(document.getElementById("task4").value);
		localStorage.setItem("thursday", JSON.stringify(thursdayTasks));	
	} else if(document.getElementById("task4").value==null || document.getElementById("task4").value=="") {
		return null;
	};
	populateList('ollist4', 'thursday');
}

function addToDo5(){
	if(!fridayTasks || fridayTasks.length===0){
        fridayTasks=[];
    }
	if(document.getElementById("task5").value!==null && document.getElementById("task5").value!==""){
		fridayTasks.push(document.getElementById("task5").value);
		localStorage.setItem("friday", JSON.stringify(fridayTasks));		
	} else if(document.getElementById("task5").value==null || document.getElementById("task5").value=="") {
		return null;
	};
	populateList('ollist5', 'friday');
}

function addToDo6(){
	if(!saturdayTasks || saturdayTasks.length===0){
        saturdayTasks=[];
    }
	if(document.getElementById("task6").value!==null && document.getElementById("task6").value!==""){
		saturdayTasks.push("<li>"+document.getElementById("task6").value+"</li>");
		localStorage.setItem("saturday", JSON.stringify(saturdayTasks));	
	} else if(document.getElementById("task6").value==null || document.getElementById("task6").value=="") {
		return null;
	};
	populateList('ollist6', 'saturday');
}

function addToDo7(){
	if(!sundayTasks || sundayTasks.length===0){
        sundayTasks=[];
    }
	if(document.getElementById("task7").value!==null && document.getElementById("task7").value!==""){
		sundayTasks.push(document.getElementById("task7").value);
		localStorage.setItem("sunday", JSON.stringify(sundayTasks));	
	} else if(document.getElementById("task7").value==null || document.getElementById("task7").value=="") {
		return null;
	};
	populateList('ollist7', 'sunday');
}


function openList(id) {
    var list = document.getElementById(id);

    if (list.style.display == "none"){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }
}

function registerServiceWorker(){
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful: ', registration);
		}, function(err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	}
}