var Main = Main || {};

Main.Game = function(){
    this.enemies = null;
    this.enemylist = [];
    this.enemies_onscreen = 5;
    this.timer = 0;
    this.time = 0;
    this.spawn_rate = 4;
    this.getHit = 0;
    this.getHitCooldown = 2000;
};

Main.Game.prototype = {
    create: function(){
        //sprites here
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.bg = this.game.add.sprite(0,0, 'bg');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(100, 490, this.game);
        this.player.create();
        this.enemies = this.game.add.group();

        this.scoreText = this.game.add.text(16, 16, 'score: 0',
            {fontSize: '26px', fontFamily: 'Arial', fill: '#ffffff'});
        this.timeText = this.game.add.text(this.game.world.width * 0.82, 16, 'time: 0',
            {fontSize: '26px', fontFamily: 'Arial', fill: '#ffffff'});
        this.healthBar = this.game.add.sprite(this.game.world.width / 2.4, 20, 'full');

    },

    update: function(){
        this.timer += 1;
        this.time = Math.floor(this.timer / 60);
        this.game.physics.arcade.collide(this.enemies);
        this.game.physics.arcade.collide(this.enemies, this.player.sprite);
        if(this.timer % (60*this.spawn_rate) === 0 && this.enemies.length < this.enemies_onscreen){

            var randX = Math.floor((Math.random()* 880) -40);
            if(randX >= 0 && randX <= 800){
                var rand = Math.floor((Math.random()*2)+1);
                if(rand === 1){
                    var randY = -40;
                } else {
                    var randY = 640;
                }
            } else {
                var randY = Math.floor((Math.random()* 640) - 40);
            }
            var enemy = new Enemy(randX, randY, this.game);
            enemy.create();
            this.enemies.add(enemy.sprite);
            this.enemylist.push(enemy);
        }
        this.player.update();
        //collision, actions here
        this.enemylist.forEach(function(enemy){
            enemy.update(this.player.sprite);
            this.game.physics.arcade.overlap(enemy.sprite, this.player.lasers, function(e, l){
                e.kill();
                Main.playerdata.score = Number(Main.playerdata.score) + 10;
                this.enemies.remove(e)
                var index = this.enemylist.indexOf(enemy);
                this.enemylist.splice(index, 1);

            }, null, this);
            this.game.physics.arcade.overlap(this.player.sprite, enemy.lasers, function(p, e){
                //p.kill();
                if (this.game.time.now > this.getHit){
                    this.getHit = this.game.time.now + this.getHitCooldown;
                    this.player.health = Number(this.player.health) - 1;
                }

            }, null, this);
        }, this);

        this.stateCheck();
        this.updateText();
    },

    stateCheck: function(){
        if(this.player.health === 3){
            this.healthBar.loadTexture('full');
        } else if(this.player.health === 2){
            this.healthBar.loadTexture('third');
        } else if(this.player.health === 1){
            this.healthBar.loadTexture('twothird');
        } else if(this.player.health === 0){
            this.healthBar.loadTexture('dead');

            Main.playerdata.time = this.time;

            Main.players[Main.players.length] = Main.playerdata;

            localStorage.players = JSON.stringify(Main.players);

            this.shutdown();
        }
    },

    updateText: function(){
        this.scoreText.setText('score: ' + Main.playerdata.score);
        this.timeText.setText('time: ' + this.time);
    },

    shutdown: function(){
        this.enemies = null;
        this.enemylist = [];
        this.time = 0;
        this.timer = 0;
        this.player = null;
        localStorage.ship = null;
        this.game.state.start("Scoreboard");
    }
    /*render: function(){
        this.game.debug.body(this.player.sprite);
        this.player.lasers.forEachAlive(this.renderGroup, this);
    },
    renderGroup: function(member){
        this.game.debug.body(member);
    }*/


};
