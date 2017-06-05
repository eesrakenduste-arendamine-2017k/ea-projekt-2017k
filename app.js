(function(){
   "use strict";

   var School = function(){

     // SEE ON SINGLETON PATTERN
     if(School.instance){
       return School.instance;
     }
     //this viitab kooli fn
     School.instance = this;

     this.routes = School.routes;
     // this.routes['home-view'].render()

     console.log('Andmebaasis');

     // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
     this.click_count = 0;
     this.currentRoute = null;
     console.log(this);

     // hakkan hoidma kõiki hindeid
     this.homeworks = [];

     // Kui tahan kooli andmebaasile referenci siis kasutan THIS = KOOLI RAKENDUS ISE
     this.init();
   };

   window.School = School; // Paneme muuutja külge

   School.routes = {
     'home-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
         console.log('>>>>avaleht');
       }
     },
     'list-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
         console.log('>>>>loend');

         //simulatsioon laeb kaua
         window.setTimeout(function(){
           //document.querySelector('.loading').innerHTML = 'laetud!';
         }, 3000);

       }
     },
     'manage-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
       }
     }
   };

   // Kõik funktsioonid lähevad kooli andmebaasi külge
   School.prototype = {

     init: function(){
       console.log('Rakendus läks tööle');

       //kuulan aadressirea vahetust
       window.addEventListener('hashchange', this.routeChange.bind(this));

       // kui aadressireal ei ole hashi siis lisan juurde
       if(!window.location.hash){
         window.location.hash = 'home-view';
         // routechange siin ei ole vaja sest käsitsi muutmine käivitab routechange event'i ikka
       }else{
         //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
         this.routeChange();
       }

       //saan kätte kodutööd localStorage kui on
       if(localStorage.homeworks){
           //võtan stringi ja teen tagasi objektideks
           this.homeworks = JSON.parse(localStorage.homeworks);
           console.log('laadisin localStorageist massiiivi ' + this.homeworks.length);

           //tekitan loendi htmli
           this.homeworks.forEach(function(homework){

               var new_homework = new Homework(homework.id, homework.subject, homework.title, homework.date);

               var li = new_homework.createHtmlElement();
               document.querySelector('.list-of-homeworks').appendChild(li);

           });

       }else{
		   
		   //küsin AJAXIGA
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					
					console.log(xhttp.responseText);
					//tekst -> objekktideks
					School.instance.homeworks = JSON.parse(xhttp.responseText);
					console.log(School.instance.homeworks);
					
					//tekitan kodutööd htmli
					School.instance.homeworks.forEach(function(homework){

					   var new_homework = new Homework(homework.id, homework.subject, homework.title, homework.date);

					   var li = new_homework.createHtmlElement();
					   document.querySelector('.list-of-homeworks').appendChild(li);

				   });
				   
				   //salvestan localStoragisse
				   localStorage.setItem('homeworks', JSON.stringify(School.instance.homeworks));
				   
					
				}
			};
			//xhttp.open("GET", "save.php", true);
			//xhttp.send();
			
			
	   }


       // esimene loogika oleks see, et kuulame hiireklikki nupul
       this.bindEvents();

     },

     bindEvents: function(){
       document.querySelector('.add-new-homework').addEventListener('click', this.addNewClick.bind(this));

       //kuulan trükkimist otsikastis
       document.querySelector('#search').addEventListener('keyup', this.search.bind(this));

     },
	 
	 edit: function(event){
       var selected_id = event.target.dataset.id;
       var clicked_li = event.target.parentNode.parentNode;
       $("#editData").modal({backdrop: true});
 
        $(document).on("click", "#edit_close", function(event){
         return;
       });
 
        $(document).on("click", "#save", function(event){
        console.log(clicked_li);
        var subject = document.querySelector('.editSubject').value;
        var title = document.querySelector('.editTitle').value;
		var date = document.querySelector('.editDate').value;
        this.homeworks = JSON.parse(localStorage.homeworks);
        clicked_li.parentNode.removeChild(clicked_li);
        for(var i=0; i<this.homeworks.length; i++){
          if(this.homeworks[i].id == selected_id){
            this.homeworks[i].subject = subject;
            this.homeworks[i].title = title;
			this.homeworks[i].date = date;
            break;
          }
        }
        localStorage.setItem('homeworks', JSON.stringify(this.homeworks));
        location.reload();
       });
     },
	 deletehomework: function(event){
		
		// millele vajutasin SPAN
		console.log(event.target);
		
		// tema parent ehk mille sees ta on LI
		console.log(event.target.parentNode);
		
		//mille sees see on UL
		console.log(event.target.parentNode.parentNode);
		
		//id
		console.log(event.target.dataset.id);
		
		var c = confirm("Oled kindel?");
		
		// vajutas no, pani ristist kinni
		if(!c){	return; }
		
		//KUSTUTAN
		console.log('kustutan');
		
		// KUSTUTAN HTMLI
		var ul = event.target.parentNode.parentNode;
		var li = event.target.parentNode;
		
		ul.removeChild(li);
		
		//KUSTUTAN OBJEKTI ja uuenda localStoragit
		
		var delete_id = event.target.dataset.id;
		
		for(var i = 0; i < this.homeworks.length; i++){
			
			if(this.homeworks[i].id == delete_id){
				//see on see
				//kustuta kohal i objekt ära
				this.homeworks.splice(i, 1);
				break;
			}	
		}
		
		localStorage.setItem('homeworks', JSON.stringify(this.homeworks));
		

		
	 },
     search: function(event){
         //otsikasti väärtus
         var needle = document.querySelector('#search').value.toLowerCase();
         console.log(needle);

         var list = document.querySelectorAll('ul.list-of-homeworks li');
         console.log(list);

         for(var i = 0; i < list.length; i++){

             var li = list[i];

             // ühe listitemi sisu tekst
             var stack = li.querySelector('.content').innerHTML.toLowerCase();

             //kas otsisõna on sisus olemas
             if(stack.indexOf(needle) !== -1){
                 //olemas
                 li.style.display = 'list-item';

             }else{
                 //ei ole, index on -1, peidan
                 li.style.display = 'none';

             }

         }
     },

     addNewClick: function(event){

       var subject = document.querySelector('.subject').value;
       var title = document.querySelector('.title').value;
	   var date = document.querySelector('.date').value;

       //1) tekitan uue kodutöö
	   var id = guid();
       var new_homework = new Homework(id, subject, title, date);

       //lisan massiiivi
       this.homeworks.push(new_homework);
       console.log(JSON.stringify(this.homeworks));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('homeworks', JSON.stringify(this.homeworks));
	   alert("Salvestamine õnnestus!");
	   
		
		//AJAX
		var xhttp = new XMLHttpRequest();
		
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			
			console.log(xhttp.readyState);
			
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				
				console.log(xhttp.responseText);
			}
		};
		
		//teeb päringu
		//xhttp.open("GET", "save.php?id="+id+"&subject="+subject+"&title="+title+"&date="+date, true);
		//xhttp.send();
	   

       // 2) lisan selle htmli listi juurde
       var li = new_homework.createHtmlElement();
       document.querySelector('.list-of-homeworks').appendChild(li);


     },

     routeChange: function(event){

       //kirjutan muuutujasse lehe nime, võtan maha #
       this.currentRoute = location.hash.slice(1);
       console.log(this.currentRoute);

       //kas meil on selline leht olemas?
       if(this.routes[this.currentRoute]){

         //muudan menüü lingi aktiivseks
         this.updateMenu();

         this.routes[this.currentRoute].render();


       }else{
         /// 404 - ei olnud
       }


     },

     updateMenu: function() {
       //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
       //1) võtan maha aktiivse menüülingi kui on
       document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

       //2) lisan uuele juurde
       //console.log(location.hash);
       document.querySelector('.'+this.currentRoute).className += ' active-menu';

     }

   }; // ANDMEBAASi LÕPP

   var Homework = function(new_id, new_subject, new_title, new_date){
	 this.id = new_id;
     this.subject = new_subject;
     this.title = new_title;
	 this.date = new_date;
     console.log('created new homework');
   };

   Homework.prototype = {
     createHtmlElement: function(){

       var li = document.createElement('li');


       var span_with_content = document.createElement('span');
       span_with_content.className = 'content';

       var content = document.createTextNode(this.subject + ' | ' + this.title + ' | ' + this.date + ' | ');
       span_with_content.appendChild(content);

       li.appendChild(span_with_content);
	   
	   //DELETE nupp
	   var span_delete = document.createElement('button');
	   span_delete.style.color = "red";
	   span_delete.style.cursor = "pointer";
	   //span_delete.style.textDecoration = "underline overline";
	   
	   //kustutamiseks panen id kaasa
	   span_delete.setAttribute("data-id", this.id);
	   span_delete.innerHTML = " Kustuta";
	  
	   li.appendChild(span_delete);
	   
	   //keegi vajutas nuppu
	   span_delete.addEventListener("click", School.instance.deletehomework.bind(School.instance));
	   

       return li;

     }
   };
   
   //HELPER
   function guid(){
		var d = new Date().getTime();
		if(window.performance && typeof window.performance.now === "function"){
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

   // kui leht laetud käivitan andmebaasi rakenduse
   
   window.onload = function(){
     var app = new School();
   };

})();
