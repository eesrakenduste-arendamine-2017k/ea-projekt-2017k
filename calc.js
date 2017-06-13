window.onload = function () {
	console.log("Worked");
}
var calneeded;
var fatneeded;
var carbneeded;
var protneeded;
var alcneeded;
var fd;

registerServiceWorker();




function cc() {
	
	
	
	var age = parseInt(document.getElementById("age").value);
	var wtype = document.getElementById("wtype").value;
	var foot = parseInt(document.getElementById("foot").value);
	var inch = parseInt(document.getElementById("inch").value);
	var cm = document.getElementById("cen").value;
	var weight = document.getElementById("weight").value;
	if (age != '' && cm != '' && weight != '') {
		if (wtype == "pounds") {
			weight = parseInt(weight);
			weight = Math.round(weight / 2.2046);
		}
		var loa = document.getElementById("loa").value;
		if (document.getElementById("gen").checked) {
			fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5;
		} else {
			fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161;
		}
		switch (loa) {
		case "1":
			calneeded = fd * 1.2;
			break;
		case "2":
			calneeded = fd * 1.375
			break;
		case "3":
			calneeded = fd * 1.53;
			break;
		case "4":
			calneeded = fd * 1.725;
			break;
		case "5":
			calneeded = fd * 1.9;
			break;
		}
		calneeded = Math.floor(calneeded);
		fatneeded = Math.floor((calneeded * 0.25) / 9);
		if (wtype == "pounds") {
			fatneeded = Math.floor(fatneeded * 0.0353);
		}
		protneeded = Math.floor((calneeded * 0.25) / 4);
		if (wtype == "pounds") {
			protneeded = Math.floor(protneeded * 0.0353);
		}
		carbneeded = Math.floor((calneeded * 0.25) / 4);
		if (wtype == "pounds") {
			carbneeded = Math.floor(carbneeded * 0.0353);
		}
		alcneeded = Math.floor((calneeded * 0.25) / 7);
		if (wtype == "pounds") {
			alcneeded = Math.floor(alcneeded * 0.0353);
		}
		document.getElementById("rc").value = " " + calneeded;
		document.getElementById("rf").value = " " + fatneeded;
		document.getElementById("rp").value = " " + protneeded;
		document.getElementById("rh").value = " " + carbneeded;
		document.getElementById("ra").value = " " + alcneeded;
		document.getElementById("l1").innerHTML = "grammi";
		document.getElementById("l2").innerHTML = "grammi";
		document.getElementById("l3").innerHTML = "grammi";
		document.getElementById("l4").innerHTML = "grammi";
		var caltype = document.getElementById("caltype").value;
		if (caltype == 'g') {
			document.getElementById("l1").innerHTML = "grammi";
			document.getElementById("l2").innerHTML = "grammi";
			document.getElementById("l3").innerHTML = "grammi";
			document.getElementById("l4").innerHTML = "grammi";
		}
		if (wtype == "pounds") {
			fat1 = fatneeded * 0.0022;
			pro1 = protneeded * 0.0022;
			car1 = carbneeded * 0.0022;
			alh1 = alcneeded * 0.0022;
			fat1 = fat1.toFixed(3);
			pro1 = pro1.toFixed(3);
			car1 = car1.toFixed(3);
			alh1 = alh1.toFixed(3);
			document.getElementById("rf").value = " " + fat1;
			document.getElementById("rp").value = " " + pro1;
			document.getElementById("rh").value = " " + car1;
			document.getElementById("ra").value = " " + alh1;
			document.getElementById("l1").innerHTML = "naela";
			document.getElementById("l2").innerHTML = "naela";
			document.getElementById("l3").innerHTML = "naela";
			document.getElementById("l4").innerHTML = "naela";
		}
		if (caltype == 'pounds') {
			fat1 = fatneeded * 0.0022;
			pro1 = protneeded * 0.0022;
			car1 = carbneeded * 0.0022;
			alh1 = alcneeded * 0.0022;
			fat1 = fat1.toFixed(3);
			pro1 = pro1.toFixed(3);
			car1 = car1.toFixed(3);
			alh1 = alh1.toFixed(3);
			document.getElementById("rf").value = " " + fat1;
			document.getElementById("rp").value = " " + pro1;
			document.getElementById("rh").value = " " + car1;
			document.getElementById("ra").value = " " + alh1;
			document.getElementById("l1").innerHTML = "naela";
			document.getElementById("l2").innerHTML = "naela";
			document.getElementById("l3").innerHTML = "naela";
			document.getElementById("l4").innerHTML = "naela";
		}
		if (caltype == 'kg') {
			fat2 = fatneeded / 1000;
			pro2 = protneeded / 1000;
			car2 = carbneeded / 1000;
			alh2 = alcneeded / 1000;
			fat2 = fat2.toFixed(3);
			pro2 = pro2.toFixed(3);
			car2 = car2.toFixed(3);
			alh2 = alh2.toFixed(3);
			document.getElementById("rf").value = " " + fat2;
			document.getElementById("rp").value = " " + pro2;
			document.getElementById("rh").value = " " + car2;
			document.getElementById("ra").value = " " + alh2;
			document.getElementById("l1").innerHTML = "kilogrammi";
			document.getElementById("l2").innerHTML = "kilogrammi";
			document.getElementById("l3").innerHTML = "kilogrammi";
			document.getElementById("l4").innerHTML = "kilogrammi";
		}
	} else {
		alert("Palun täida kõik lahtrid õigesti!");
	}
}



function con(num) {
	var hc = parseInt(num.value);
	var hi = hc / 2.54;
	var hf = Math.floor(hi / 12);
	var ri = Math.round(hi % 12);
	if (hc > 40 && hc <= 210) {
		document.getElementById("foot").value = hf;
	}
	document.getElementById("inch").value = ri;
}

function hcon() {
	var hf = parseInt(document.getElementById("foot").value);
	var hi = parseInt(document.getElementById("inch").value);
	var hc;
	hc = Math.round((hf * 30.48) + (hi * 2.54));
	document.getElementById("cen").value = hc;
}

function cknum(event, num) {
	var kc;
	if (window.event) {
		kc = event.keyCode;
	} else {
		kc = event.which;
	}
	var a = num.value;
	if (kc == 48) {
		if (a == "") {
			return false;
		} else {
			return true;
		}
	}
	if (kc != 8 && kc != 0) {
		if (kc < 49 || kc > 57) {
			return false;
		}
	}
}

function isNumberKey(id) {
	var no = eval('"' + id + '"');
	var number = document.getElementById(no).value;
	if (!number.match(/^[0-9\.]+$/) && number != "") {
		number = number.substring(0, number.length - 1);
		document.getElementById(id).value = number;
	}
}

function convert() {
	var age = parseInt(document.getElementById("age").value);
	var cm = document.getElementById("cen").value;
	var weight = document.getElementById("weight").value;
	if (age != '' && cm != '' && weight != '') {
		var caltype = document.getElementById("caltype").value;
		var fat = document.getElementById("rf").value;
		var pro = document.getElementById("rp").value;
		var car = document.getElementById("rh").value;
		var alh = document.getElementById("ra").value;
		if (caltype == 'g') {
			document.getElementById("rc").value = " " + calneeded;
			document.getElementById("rf").value = " " + fatneeded;
			document.getElementById("rp").value = " " + protneeded;
			document.getElementById("rh").value = " " + carbneeded;
			document.getElementById("ra").value = " " + alcneeded;
			document.getElementById("l1").innerHTML = "grammi";
			document.getElementById("l2").innerHTML = "grammi";
			document.getElementById("l3").innerHTML = "grammi";
			document.getElementById("l4").innerHTML = "grammi";
		}
		if (caltype == 'pounds') {
			fat1 = fatneeded * 0.0022;
			pro1 = protneeded * 0.0022;
			car1 = carbneeded * 0.0022;
			alh1 = alcneeded * 0.0022;
			fat1 = fat1.toFixed(3);
			pro1 = pro1.toFixed(3);
			car1 = car1.toFixed(3);
			alh1 = alh1.toFixed(3);
			document.getElementById("rf").value = " " + fat1;
			document.getElementById("rp").value = " " + pro1;
			document.getElementById("rh").value = " " + car1;
			document.getElementById("ra").value = " " + alh1;
			document.getElementById("l1").innerHTML = "naela";
			document.getElementById("l2").innerHTML = "naela";
			document.getElementById("l3").innerHTML = "naela";
			document.getElementById("l4").innerHTML = "naela";
		}
		if (caltype == 'kg') {
			fat2 = fatneeded / 1000;
			pro2 = protneeded / 1000;
			car2 = carbneeded / 1000;
			alh2 = alcneeded / 1000;
			fat2 = fat2.toFixed(3);
			pro2 = pro2.toFixed(3);
			car2 = car2.toFixed(3);
			alh2 = alh2.toFixed(3);
			document.getElementById("rf").value = " " + fat2;
			document.getElementById("rp").value = " " + pro2;
			document.getElementById("rh").value = " " + car2;
			document.getElementById("ra").value = " " + alh2;
			document.getElementById("l1").innerHTML = "kilogrammi";
			document.getElementById("l2").innerHTML = "kilogrammi";
			document.getElementById("l3").innerHTML = "kilogrammi";
			document.getElementById("l4").innerHTML = "kilogrammi";
		}
	} else {
		alert("Täida kõik lahtrid õigesti!");
	}
}

function registerServiceWorker(){
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful: ', registration);

                    Sayings.instance.registerNotifications(registration);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
         
			}
	}	

