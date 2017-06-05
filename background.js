window.onload=function(){
	document.getElementById('titles').innerHTML = "See on uudiselugeja. Vali sobiv allikas."
	var y;

	document.getElementById("switch").addEventListener("click", function(){	
		y = document.getElementById("switch").checked;
	});
	
	$(document).ready(function(){
	   $('body').on('click', 'a', function(){
		 chrome.tabs.create({url: $(this).attr('href')});
		 return false;
	   });
	});
	
	document.getElementById("Delfi").addEventListener("click", function(){
		document.getElementById("HS").style.background='';
		document.getElementById("Postimees").style.background='';
		document.getElementById("Delfi").style.background='#4CAF50';
		document.getElementById('titles').innerHTML ="";
		var counter=0;
		$.get('http://feeds2.feedburner.com/delfiuudised', function (data) {
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
				
				var address = el.find("link").text();
				var description = el.find("description").text()+"<br>";
				if (y==true){
					var titles = "<h2><a href="+address+"><b>"+el.find('title').text()+"</b></a></h2>";
					//var picture = "<img src="+el.find("enclosure").attr('url')+"><br>";
					//Delfi RSS img link katki.
				}else{
					var titles = "<b>"+el.find("title").text()+"</b><br>";
				}
							
				
				if (counter<20){
					$('#titles').append(titles);
					$('#titles').append(description);
					counter++;
				}
				
			});
			
		});

	});
	
	document.getElementById("Postimees").addEventListener("click", function(){
		document.getElementById("Delfi").style.background='';
		document.getElementById("HS").style.background='';
		document.getElementById("Postimees").style.background='#4CAF50';
		document.getElementById('titles').innerHTML ="";
		var counter=0;
		$.get('https://postimees.ee/rss', function (data) {
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
				
				
				var address = el.find("link").text();
				var description = el.find("description").text()+"<br>";
				if (y==true){
					var titles = "<h2><a href="+address+"><b>"+el.find('title').text()+"</b></a></h2>";
					var picture = "<img src="+el.find("enclosure").attr('url')+"><br>";
				}else{
					var titles = "<b>"+el.find("title").text()+"</b><br>";
				}
				
				
				
				if (counter<20){
					$('#titles').append(titles);
					$('#titles').append(picture);
					$('#titles').append(description);
					counter++;
				}
				
			});
			
		});
		
	});
	
	document.getElementById("HS").addEventListener("click", function(){
		document.getElementById("Delfi").style.background='';
		document.getElementById("Postimees").style.background='';
		document.getElementById("HS").style.background='#4CAF50';
		document.getElementById('titles').innerHTML ="";
		var counter=0;
		$.get('http://www.hs.fi/rss/tuoreimmat.xml', function (data) {
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
				
				
				var address = el.find("link").text();
				var description = el.find("description").text()+"<br>";
				if (y==true){
					var titles = "<h2><a href="+address+"><b>"+el.find('title').text()+"</b></a></h2>";
					var picture = "<img src="+el.find("enclosure").attr('url')+"><br>";
				}else{
					var titles = "<b>"+el.find("title").text()+"</b><br>";
				}
				if (counter<20){
					$('#titles').append(titles);
					$('#titles').append(picture);
					$('#titles').append(description);
					counter++;
				}
				
			});
			
		});
		
	});
}
