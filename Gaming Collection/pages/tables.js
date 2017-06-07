var computerContent = 0;
var consoleContent = 0;
var portableContent = 0;
var boardContent = 0;
var cardContent = 0;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

window.onload = function(){
	document.getElementById("animatePage").style.marginLeft = "0%";
	document.getElementById("animatePage").style.margin = "50px";

	try{computerContent = document.getElementById("computerContent").innerHTML.length;}
	catch(e){computerContent = 0}
	
	try{consoleContent = document.getElementById("consoleContent").innerHTML.length;}
	catch(e){consoleContent = 0}
	
	try{portableContent = document.getElementById("portableContent").innerHTML.length;}
	catch(e){portableContent = 0}
	
	try{boardContent = document.getElementById("boardContent").innerHTML.length;}
	catch(e){boardContent = 0}
	
	try{cardContent = document.getElementById("cardContent").innerHTML.length;}
	catch(e){cardContent = 0}
	
	console.log(computerContent,
		consoleContent,
		portableContent,
		boardContent,
		cardContent);
	if(computerContent>0){
		document.getElementById("computerTable1").style.display = "inline-table";
		document.getElementById("computerTable2").style.display = "inline";
	}
	if(consoleContent>0){
		document.getElementById("consoleTable1").style.display = "inline-table";
		document.getElementById("consoleTable2").style.display = "inline";
	}
	if(portableContent>0){
		document.getElementById("portableTable1").style.display = "inline-table";
		document.getElementById("portableTable2").style.display = "inline";
	}
	if(boardContent>0){
		document.getElementById("boardTable1").style.display = "inline-table";
		document.getElementById("boardTable2").style.display = "inline";
	}
	if(cardContent>0){
		document.getElementById("cardTable1").style.display = "inline-table";
		document.getElementById("cardTable2").style.display = "inline";
	}
}