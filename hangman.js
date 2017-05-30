window.onload = function () {
  $("body").hide();
  $("body").fadeIn(1000);
  $("#reset").hide();
  var alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'o', 'p', 'ü', 'õ', 'a', 's', 'd', 'f', 'g', 'h', 'j',
        'k', 'l', 'ö', 'ä', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

  var categories;
  var categoryName=["filmid", "vms"]         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var geuss ;             // Geuss
  var guesses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  //var categoryName = ["jalka", "kino", "linnad"];
  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Select Catagory
  /*var selectCat = function () {
    if (chosenCategory === categories[0]) {
<<<<<<< HEAD
      categoryName.innerHTML = "The Chosen Category Is Premier league";
=======
      catagoryName.innerHTML = "";
>>>>>>> origin/master
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "The Chosen Category Is Cities";
    }
<<<<<<< HEAD
=======
  }*/
  chosenCategory = categoryName[Math.floor(Math.random()*categoryName.length)];
  var selectCat=function(){
      for (var i = 0; i < categoryName.length; i++) {
        if (chosenCategory === categoryName[i]) {
          catName.innerHTML="valitud kategooria on: " + categoryName[i];
        }
      }
>>>>>>> origin/master
  };
  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

    var hideElement = function(){

    };

  // Show lives
   comments = function () {

    showLives.innerHTML = "Sul on " + lives + " elu!";
    if (lives < 1) {
      $("#buttons").add("#hint").add("#clue").fadeOut(1000);
      $("#reset").fadeIn(1000);
      showLives.innerHTML = "Mäng Läbi! " + "<br/>" + "Õige vastus oli: " + "<br/>" + "''" + word + "''";
      //$("categoryName").fadeOut(1000);
      gameOver.play();
      setTimeout(wrongAudio, 1000);
      //fatality.play();
      //$("canvas").fadeOut(5000);
      showLives.style.color = "red";
    }else if (lives < 5) {
      showLives.innerHTML = "Sul on " + lives + " elu veel alles!";
      showLives.style.color = "orange";
    }else{
      showLives.style.color = "lime";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        $("#buttons").add("#hint").add("#clue").fadeOut(1000);
        $("#reset").fadeIn(1000);
        showLives.innerHTML = "Vastasid õigesti!";
        showLives.style.color = "lime";
        winSound.play();
      }
    }
  };

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  };


   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    };

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
};

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 90, 50);
   };

   leftArm = function() {
     draw (60, 46, 30, 50);
   };

   rightLeg = function() {
     draw (60, 70, 90, 100);
   };

   leftLeg = function() {
     draw (60, 70, 30, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

  var rightSound = document.getElementById("rightSound");
  var wrongSound = document.getElementById("wrongSound");
  var gameOver = document.getElementById('gameOver');
  var winSound = document.getElementById('winSound');
  var fatality = document.getElementById('fatality');
  correctAudio = function(){
    rightSound.play();
  };
  wrongAudio = function(){
    fatality.play();
  };

  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
          this.style.backgroundColor = "rgba(0, 255, 0, 1)";
          rightSound.play();
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        this.style.backgroundColor = "rgba(255, 0, 0, 1)";
        wrongSound.play();
        comments();
        animate();
      } else {
        comments();
      }
    };
  };



  // Play
  play = function () {
    $("#buttons").add("#categoryName").add("#hint").add("#clue").fadeIn(1000);
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    //chosenCategory = categories[i]; //categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Vihje: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
