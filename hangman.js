window.onload = function () {
  //$("body").hide();
  $("body").fadeIn(400);
  $("#reset").hide();
  var alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'o', 'p', 'ü', 'õ', 'a', 's', 'd', 'f', 'g', 'h', 'j',
        'k', 'l', 'ö', 'ä', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

  var categories;
  var categoryNames= ["raamatute kultusklassika", "õudusfilmid", 'euroopa pealinnad'];         // Array of topics
  var randCategoryName;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var geuss ;             // Geuss
  var guesses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var score = 0;
  //var categoryNames = ["jalka", "kino", "linnad"];
  // Get elements
  var showLives = document.getElementById("mylives");
  var gameOver = document.getElementById("gameOver");
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

  var selectCategory = function(){
      for (var i = 0; i < categoryNames.length; i++) {
        if (randCategoryName === categoryNames[i]) {
          categoryName.innerHTML = "kategooria - " + categoryNames[i];
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

    /* mute music
    document.getElementById("mute").onclick = function(){
      if (backgroundMusic.pause()){
        backgroundMusic.play();
      }else {
        backgroundMusic.pause();
      }
    };*/

  // Show lives
   updateGameState = function () {
    showLives.innerHTML = "Elud: " + lives;

    if (lives < 1) {
      $("#buttons").add("#hint").add("#clue").fadeOut(400);
      $("#gameState").add("#reset").fadeIn(400);
      gameState.innerHTML = "Mäng Läbi! " + "<br/>" + "Õige vastus oli: " + "<br/>" + "''" + word + "''";
      console.log(p_name+':'+score);

      //SIIA SKOORI SALVESTAMINE
      saveScore(p_name, score);
      //$("categoryNames").fadeOut(1000);
      //gameState.style.color = "red";

      score = 0;
      backgroundMusic.pause();
      showScore.innerHTML = "skoor: " + score;
      gameOver.play();
      setTimeout(wrongAudio, 1000);
    }else if (lives <= 5 && lives > 2) {
      showLives.style.color = "orange";
    }else if(lives <= 2){
      showLives.style.color = "red";
    }else{
      showLives.style.color = "lime";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        $("#buttons").add("#hint").add("#clue").fadeOut(1000);
        //showLives.innerHTML = "Vastasid õigesti!";
        score += 10;
        //removeWord(randIndex);
        showScore.innerHTML = "skoor: " + score;
        showLives.style.color = "lime";
        winSound.play();
        //console.log(counter);
        reset();
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

  // helid
  var rightSound = document.getElementById("rightSound");
  var wrongSound = document.getElementById("wrongSound");
  var gameState = document.getElementById('gameState');
  var winSound = document.getElementById('winSound');
  var fatality = document.getElementById('fatality');
  var backgroundMusic = document.getElementById("backgroundMusic");

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
          score += 1;
          if (score > 0){
            showScore.style.color = "lime";
          }
          showScore.innerHTML = "skoor: " + score;
          console.log(score);
          this.style.backgroundColor = "rgba(0, 255, 0, 1)";
          rightSound.play();
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        score -= 1;
        if (score < 0){
          showScore.style.color = "red";
        }

        showScore.innerHTML = "skoor: " + score;
        this.style.backgroundColor = "rgba(105,105,105, 1)";
        wrongSound.play();
        updateGameState();
        animate();
      } else {
        updateGameState();
      }
    };
  };


  function playerName() {
    p_name = prompt("Sisesta mängija nimi");
    if (p_name === null || p_name ==='') {
      p_name = 'Tundmatu';
    }
    console.log(p_name);
  }


  // Play
  play = function () {
    //backgroundMusic.play();
    $("#buttons").add("#categoryName").add("#hint").add("#clue").fadeIn(400);
    $("#reset").fadeOut(400);
    categories = [
        ["tappa laulurästas", "kuristik-rukkis", "kellavärgiga-apelsin", "kaklusklubi", "väike-prints","lolita","ameerika-psühho"],
        ["voonakeste-vaikimine", "kurja kutsumine", "tulnukas", "carrie", "metsamajake","elmstreeti-luupainaja", "ring"],
        ["london", "pariis", "stockholm", "amsterdam", "helsinki", "tallinn", "viin"]
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
    updateGameState();
    selectCategory();
    canvas();
    return randIndex;
  };

  var removeWord = function(index) {
    var removeIndex = categories.indexOf(word);
    console.log(word);
    categories[index].splice(removeIndex, 1);
    console.log(removeIndex);
    console.log(categories);
  };

  play();
  playerName();

  // Hint

    hint.onclick = function() {

      hints = [
        ["autor: harper lee", "autor: j.d. salinger", "autor: anthony burgess", "autor: chuck palahniuk", "autor: Antoine de Saint-Exupéry", "autor: Vladimir Nabokov", "autor: Bret Easton Ellis"],
        ["maailma kuulsaim kannibal", "ed & lorraine warren", "ripley päästab päeva", "puberteedieas tüdruk avastab telekineesivõimed", "thor sõidab motikaga nähtamatu seina vastu", "küünistega tüüp ei lase magada", "tsikk ronib kaevust välja"],
        ["suurim linn euroopas","selle linna tuntuim vaatamisväärsus pidi seal algselt olema vaid 20 aastat","abba", "selle linna kanalitest tõmmatakse iga aasta 25000 jalgratast välja", "nokia", "ajalooline nimi on olnud saksalaadne reval", "vodka"]
    ];

    var catagoryIndex = categories.indexOf(randCategoryName);
    console.log(catagoryIndex);
    var hintIndex = randCategoryName.indexOf(word);
    console.log(hintIndex);
    showClue.innerHTML = "Vihje: - " +  hints [categoryNames[catagoryIndex]][hintIndex];
  };

   // Reset

  var reset = document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    $("#gameState").hide();
    context.clearRect(0, 0, 400, 400);
    play();
  };


  function saveScore(x,y) {
    var session = [];
    var game = {
      id: parseInt(1000 + Math.random()*999),
      nimi: x,
      skoor: y
    };
    var gamesFromStorage = null;
    if (localStorage.getItem("session")) {
      gamesFromStorage = JSON.parse(localStorage.getItem("session"));
      if (gamesFromStorage) {
        session = gamesFromStorage;
      }
    }
    session.push(game);
    console.log(game);
    localStorage.setItem("session", JSON.stringify(session));
  }
};
