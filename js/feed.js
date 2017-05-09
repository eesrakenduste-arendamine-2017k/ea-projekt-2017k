//http://jsfiddle.net/mattboldt/M3YaZ/

!function($){

	"use strict";

	var Typed = function(el, options){

		// chosen element to manipulate text
		this.el = $(el);
		// options
		this.options = $.extend({}, $.fn.typed.defaults, options);

		// text content of element
		this.text = this.el.text();

		// typing speed
		this.typeSpeed = this.options.typeSpeed;
		
		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// current string based on current values[] array position
		this.string = this.strings[this.arrayPos];

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 1;
		if (this.loop === false){
			// number in which to stop going through array
			// set to strings[] array (length - 1) to stop deleting after last string is typed
			this.stopArray = this.strings.length-1;
		}
		else{
			this.stopArray = this.strings.length;
		}

		// All systems go!
		this.build();
	}

		Typed.prototype =  {

			constructor: Typed

			, init: function(){
				// begin the loop w/ first current string (global self.string)
				// current string will be passed as an argument each time after this
				var self  = this;
			  	setTimeout(function() {
			  		// Start typing
					self.typewrite(self.string, self.strPos)
			  	}, self.startDelay);
			}

			, build: function(){
				// Insert cursor
				//this.el.after("<span id=\"typed-cursor\">|</span>");
				this.init();
			}

			// pass current string state to each function
			, typewrite: function(curString, curStrPos){

				// varying values for setTimeout during typing
				// can't be global since number changes each time loop is executed
				var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
				var self = this;

				// ------------- optional ------------- //
				// backpaces a certain string faster
				// ------------------------------------ //
				// if (self.arrayPos == 1){
				// 	self.backDelay = 50;
				// }
				// else{ self.backDelay = 500; }

				// containg entire typing function in a timeout
				setTimeout(function() {

					// make sure array position is less than array length
					if (self.arrayPos < self.strings.length){

						// start typing each new char into existing string
						// curString is function arg
                        // CUSTOM PLACEHOLDER TEXT
						self.el.attr("placeholder", curString.substr(0, curStrPos));

						// check if current character number is the string's length
						// and if the current array position is less than the stopping point
						// if so, backspace after backDelay setting
						if (curStrPos > curString.length && self.arrayPos < self.stopArray){
							clearTimeout(clear);
							var clear = setTimeout(function(){
								self.backspace(curString, curStrPos);
							}, self.backDelay);
						}

						// else, keep typing
						else{
							// add characters one by one
							curStrPos++;
							// loop the function
							self.typewrite(curString, curStrPos);
							// if the array position is at the stopping position
							// finish code, on to next task
							if (self.loop === false){
								if (self.arrayPos === self.stopArray && curStrPos === curString.length){
									// animation that occurs on the last typed string
									// fires callback function
									var clear = self.options.callback();
									clearTimeout(clear);
								}
							}
						}
					}
					// if the array position is greater than array length
					// and looping is active, reset array pos and start over.
					else if (self.loop === true && self.loopCount === false){
						self.arrayPos = 0;
						self.init();
					}
						else if(self.loopCount !== false && self.curLoop < self.loopCount){
							self.arrayPos = 0;
							self.curLoop = self.curLoop+1;
							self.init();
						}

				// humanized value for typing
				}, humanize);

			}

			, backspace: function(curString, curStrPos){

				// varying values for setTimeout during typing
				// can't be global since number changes each time loop is executed
				var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
				var self = this;

				setTimeout(function() {

					// ----- this part is optional ----- //
					// check string array position
					// on the first string, only delete one word
					// the stopNum actually represents the amount of chars to
					// keep in the current string. In my case it's 14.
					// if (self.arrayPos == 1){
					//	self.stopNum = 14;
					// }
					//every other time, delete the whole typed string
					// else{
					//	self.stopNum = 0;
					// }

					// ----- continue important stuff ----- //
					// replace text with current text + typed characters
                    // CUSTOM PLACEHOLDER TEXT
					self.el.attr("placeholder", curString.substr(0, curStrPos));

					// if the number (id of character in current string) is
					// less than the stop number, keep going
					if (curStrPos > self.stopNum){
						// subtract characters one by one
						curStrPos--;
						// loop the function
						self.backspace(curString, curStrPos);
					}
					// if the stop number has been reached, increase
					// array position to next string
					else if (curStrPos <= self.stopNum){
						clearTimeout(clear);
						var clear = self.arrayPos = self.arrayPos+1;
						// must pass new array position in this instance
						// instead of using global arrayPos
						self.typewrite(self.strings[self.arrayPos], curStrPos);
					}

				// humanized value for typing
				}, humanize);

			}

		}

	$.fn.typed = function (option) {
	    return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('typed')
	        , options = typeof option == 'object' && option
	      if (!data) $this.data('typed', (data = new Typed(this, options)))
	      if (typeof option == 'string') data[option]()
	    });
	}


}(window.jQuery);

$(function(){
        $("#querybox").typed({
        strings: ["ISS", "Tallinn", "America", "Republicans"],
        typeSpeed: 100
        });
    });


var $grid;

$(function() {

    //laetud

    getTweets();
	$("#form").submit(function(e) {

	    var url = "getfeed.php"; // the script where you handle the form input.
		var serializedData = $("#form").serialize();
		//console.log(serializedData);
		$(".message").css("opacity", "1").delay(2000).animate({
		    opacity: 0
		  }, 500, function() {
		    // Animation complete.
		  });;
		$("#form #querybox").val('');
	    $.ajax({
	           type: "POST",
	           url: url,
	           data: serializedData , // serializes the form's elements.
	           success: function(data)
	           {
	           		$("#form #querybox").val('');
	           		$(".message").css("opacity", "1");
	           		getTweets();

	               
	           },
	           error: function(data){
	           		console.log(data);

	           }
	         });

	    e.preventDefault(); // avoid to execute the actual submit of the form.
	});


    /*$grid = $('#content').isotope({
        //üks kast
        itemSelector: ".item"
    });*/

});


function getTweets(){

    //vajadusel saab urliga kaasa saata parameetreid
    $.ajax({
        url: "feed.json",
        dataType : "html",
        success: function(data){

            //stringi teen massiiviks
            var array = JSON.parse(data).statuses;

            //console.log(array);
            printTweets(array);

        },
        error: function(error){
            console.log(error);
        }
    });

}

function printTweets(newTweets){

    var html = '';

    $(newTweets).each(function(i, tweet){
    	var str = tweet.text;
        // Set the regex string
        var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
        // Replace plain text links by hyperlinks
        var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        // Echo link
       
        html += '<div class="item animated fadeIn">'+

        '<div class="profile-image" style="background-image:url('+tweet.user.profile_image_url.replace("_normal", "")+');"></div>'+
        '<p><a class="twitter-screen-name" href="https://twitter.com/'+tweet.user.screen_name+' target="_blank">'+tweet.user.screen_name+'</a></p>'+
        '<p>'+replaced_text+'</p>'+

        '</div>';

    });

    // laeb sisu allapoole otsa
    //$("#content").append( $(html) );

    // $(html) teeb tavalise stringi html elementideks, see on vajalik isotope'i jaoks
    var tweetsHTML = $(html);

    // laeb ettepoole otsa ja aktiveerib isotope'i
    $("#content").prepend(tweetsHTML)
    //$grid.prepend(tweetsHTML)
    //.isotope('prepended', tweetsHTML)
    //.isotope('layout');

    //oota ja siis küsi uuesti
    /*window.setTimeout(function(){
        getTweets();
    },5000);*/

}