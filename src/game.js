window.onload = function() {

	// Loon uue mängu
	var game = new Phaser.Game(640, 480, Phaser.AUTO, "");

	// Muutujad
	var shipGravity = 800;
	var shipSpeed = 500;
	var shipBoostPower = 350;
	var rockInterval = 900;
     
    var play = function(game){}
     
    play.prototype = {

		preload: function(){

			// Panen mängu ekraani keskele
	        game.scale.pageAlignHorizontally = true;
	        game.scale.pageAlignVertically = true;

	        // Keskkonna muutujad
	        game.stage.backgroundColor = '#333';

			// Laen sisse vajalikud failid
			game.load.image("ship", "assets/ship.png");
			game.load.image("rock", "assets/rock.png");
			game.load.audio('rockets', 'assets/rockets.wav');
		},

		create: function(){

			game.physics.startSystem(Phaser.Physics.ARCADE);

			// Loon laeva
			ship = game.add.sprite(80, 240, "ship");
			/* ship.anchor.set(0.5);*/
			game.physics.arcade.enable(ship);
			ship.body.gravity.y = shipGravity;

			// Loon uue rühma kive
			rockGroup = game.add.group();

			// Loon muutujad skoori pidamiseks
			score = 0;
			topScore = localStorage.getItem("topSpacerunScore")==null?0:localStorage.getItem("topSpacerunScore");
			scoreText = game.add.text(10, 10, "0", { font:"16px Arial", fill: "#ffffff"	});

			// Kui mäng algab, uuenda skoorid
			updateScore();

			// Et saaks hüpata
			game.input.onDown.add(boost, this);

			// Et saaks space'ga hüpata
	        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	        spaceKey.onDown.add(boost, this); 

	        // Lisan heli hüppamisel
			//boostSound = game.add.audio('rockets');
			//boostSound.volume = 0.2;

			// Lisan kivi teatud intervali tagant
			game.time.events.loop(rockInterval, addrock); 
			addrock();
		},

		update: function(){

			// Kui laev läheb vastu kivi, lõpeta mäng
			game.physics.arcade.collide(ship, rockGroup, gameOver);

			// Kui laev läheb mängu piiridest välja, lõpeta mäng
			if(ship.y>game.height){
				gameOver();
			}	
		}
	}
     
    // Kui kõik läbi, alustan tervet mängu uuesti
    game.state.add("Play", play);
    game.state.start("Play");
    
    // Funktsioon skoori uuendamiseks
    function updateScore(){
		scoreText.text = "Score: " + score + "\nBest: "+ topScore;	
	}
    
    // Funktsioon tõusmiseks
	function boost(){
		ship.body.velocity.y = -shipBoostPower;
		boostSound.play()
	}

	// Funktsioon mängu lõpetamiseks ja uuesti alustamiseks
	function gameOver(){
		localStorage.setItem("topSpacerunScore", Math.max(score,topScore));
		game.state.start("Play");
	}

	// Funktsioon kivi tekitamiseks
	function addrock(){
		// Kivi asukoht on random, vahemikus 0-480px
		var rockPosition = game.rnd.between(0, 480);
		var oneRock = new rock(game, 640, rockPosition, -shipSpeed);
		game.add.existing(oneRock);
		rockGroup.add(oneRock);
	}

	// Kutsun kivi välja, muudan ta füüsiliseks objektiks ja annan omadused
	rock = function (game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, "rock");
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
		this.giveScore = true;	
	};
	
	// Tekitan kivi
	rock.prototype = Object.create(Phaser.Sprite.prototype);
	rock.prototype.constructor = rock;

	// Update parameetrid seoses kiviga
	rock.prototype.update = function() {

		// Kui laev läheb kivist mööda, annan punkti ja uuendan skoori
		if(this.x + this.width < ship.x && this.giveScore){
			score += 1;
			updateScore();
			this.giveScore = false;
		}

		// Kui kivi läheb mängu piiridest välja, hävitan kivi
		if(this.x<-this.width){
			this.destroy();
		}
	};	
}