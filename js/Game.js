var Main = Main || {};

Main.Game = function(){
    this.enemies = null;
    this.enemylist = [];
    this.enemies_onscreen = 5;
    this.timer = 0;
    this.spawn_rate = 2;
};

Main.Game.prototype = {
    create: function(){
        //sprites here
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.bg = this.game.add.sprite(0,0, 'bg');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(100, 490, this.game);
        this.player.create();
        this.enemies = this.game.add.group();

    },

    update: function(){
        this.timer += 1;
        if(this.timer % (60*this.spawn_rate) === 0 && this.enemies.length < this.enemies_onscreen){
            var enemy = new Enemy(Math.floor((Math.random()*800)), Math.floor((Math.random()*600)), this.game);
            enemy.create();
            this.enemies.add(enemy.sprite);
            this.enemylist.push(enemy);
        }
        this.player.update();
        //collision, actions here
        this.enemylist.forEach(function(enemy){
            enemy.update(this.player.sprite);
        }, this);

    }
};