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

//kuulab igat clicki
document.addEventListener("click", function(e) {
	var click = e.target.id;
	//console.log(click);
	// tegevused, mis juhtuvad siis kui kasutaja vajutab edasi või tagasi nuppe formis
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
		//kontrollib kas internet on browseris, kui on, siis kustutab localStoragest kõik ära
		if(navigator.onLine == true){
			localStorage.clear();
			Push.create("Hey " + document.getElementById("answer7").value, {
				body: "Küsimused on edukalt täidetud",
				icon: "icon.ico",
				timeout: 5000,
			});
		} else {
			Push.create("Hey " + document.getElementById("answer7").value, {
				body: "Interneti ühendus puudub. Tule tagasi ja lõpeta küsitlus hiljem, kõik andmed on salvestatud ",
				icon: "icon.ico",
				timeout: 5000,
			});
		}
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


var date = new Date();
var day = date.getDay();

//localStoragesse salvestamine
window.addEventListener('keypress', function(e) {
	var active = document.activeElement;
	//console.log(e);
	//console.log(active.value.length);
	console.log(active.value + String.fromCharCode(e.which));
	if(active.className == "answer") {
		localStorage.setItem(active.id, active.value + String.fromCharCode(e.which));
		localStorage.setItem("time", new Date() * 1);
		//console.log(localStorage.getItem("time"));
		//console.log(localStorage.getItem(active.id));
	} 
});

 

//console.log(parseInt(localStorage.getItem("time")) + (5*1000));
//console.log(new Date()*1);
//console.log(parseInt(localStorage.getItem("time")) + (5*1000) > new Date()*1);


var named = document.getElementById("wrapper"); 
var tags = named.getElementsByTagName("input");

//kontrollib, et viimasest formi täitmisest poleks liiga palju aega möödas
// kui pole, siis võtab localStoragest andmed ja lükkab väljadele
if(parseInt(localStorage.getItem("time")) + (12*60*60*1000) > new Date()*1){
	for (var i = 0, n = tags.length; i < n; i = i + 1) {
	   tags[i].value = localStorage.getItem(tags[i].id);
	}
}



//ServiceWorker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful: ', registration);
		registerNotifications(registration)
		
	}, function(err) {
		// registration failed :(
		console.log('ServiceWorker registration failed: ', err);
	});
}
function registerNotifications(registration){
	registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlB64ToUint8Array("BO9Br-LnntR7cvm5-YQNGhFgkX4LS0vb_7mP6w3xsyb0Nrle4HBIJIzP-fhbo_9BbIaF_HGLDh3KvZUTjjEyyMc")
	})
	.then(function(subscription) {
		console.log('User is subscribed.');
		console.dir(JSON.stringify(subscription));
	})
	.catch(function(err) {
		console.log('Failed to subscribe the user: ', err);
	});
}
function urlB64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
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














