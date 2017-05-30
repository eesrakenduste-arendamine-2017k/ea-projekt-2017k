window.onload = function () {
  $("body").hide();
  $("body").fadeIn(1000);
  $("#reset").hide();
  var alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'o', 'p', 'ü', 'õ', 'a', 's', 'd', 'f', 'g', 'h', 'j',
        'k', 'l', 'ö', 'ä', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

  var categories;
  var categoryNames= ["raamatute kultusklassika", "õudusfilmid", 'euroopa linnad'];         // Array of topics
  var randCategoryName;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var geuss ;             // Geuss
  var guesses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  //var categoryNames = ["jalka", "kino", "linnad"];
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
      categoryNames.innerHTML = "The Chosen Category Is Premier league";
=======
      catagoryName.innerHTML = "";
>>>>>>> origin/master
    } else if (chosenCategory === categories[1]) {
      categoryNames.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      categoryNames.innerHTML = "The Chosen Category Is Cities";
    }
<<<<<<< HEAD
=======
  }*/
  //alert(randIndex);
  var selectCategory = function(){
      for (var i = 0; i < categoryNames.length; i++) {
        if (randCategoryName === categoryNames[i]) {
          categoryName.innerHTML = "valitud kategooria on: " + categoryNames[i];
          return categoryNames[i];
        }
      }
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
      //$("categoryNames").fadeOut(1000);
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
    $("#reset").fadeOut(1000);
    categories = [
        ["1984", "kuristik-rukkis", "kellavärgiga-apelsin", "kaklusklubi", "väike-prints","lolita","ameerika-psühho"],
        ["voonakeste-vaikimine", "reede 13", "tulnukas", "carrie", "metsamajake","elm streeti luupainaja", "ring"],
        ["london", "pariis", "firenze", "amsterdam", "manchester", "tallinn", "leeuwarden"]
    ];
    var randIndex = Math.floor(Math.random()*categoryNames.length);
    randCategoryName = categoryNames[randIndex];
    word = categories[randIndex][Math.floor(Math.random() * categories[randIndex].length)];
    //alert(word);
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCategory();
    canvas();
  };

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["autor: george orwell", "autor: j.d. salinger", "autor: anthony burgess", "autor: chuck palahniuk", "autor: Antoine de Saint-Exupéry", "autor: Vladimir Nabokov", "autor: Bret Easton Ellis"],
        ["maailma kuulsaim kannibal", "tüüp ei lase noortel järve ääres lõbutseda", "ripley päästab päeva", "puberteedieas tüdruk avastab telekineesivõimed", "thor sõidab motikaga nähtamatu seina vastu", "küünistega tüüp ei  lase magada", "tsikk ronib kaevust välja"],
        ["suurim linn euroopas","selle linna tuntuim vaatamisväärsus pidi seal algselt olema vaid 20 aastat","renessanssi sünnipaik", "selle linna kanalitest tõmmatakse iga aasta 25000 jalgratast välja", "2017 mais toimus seal toimunud popkontserdil pommirünnak", "ajalooline nimi on olnud saksalaadne reval", "linn hollandis"]
    ];

    var catagoryIndex = categories.indexOf(randCategoryName);
    console.log(catagoryIndex);
    var hintIndex = randCategoryName.indexOf(word);
    console.log(hintIndex);
    showClue.innerHTML = "Vihje: - " +  hints [categoryNames[catagoryIndex]][hintIndex];
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
