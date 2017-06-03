var Main = Main || {};

Main.Game = function(){
    this.enemies = null;
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

        this.enemies = this.game.add.group();

    },

    update: function(){
        this.timer += 1;
        if(this.timer % (60*this.spawn_rate) === 0 && this.enemies.length < this.enemies_onscreen){
            var enemy = new Enemy(Math.floor((Math.random()*800)), Math.floor((Math.random()*600)), this.game);
            enemy.create();
            this.enemies.add(enemy.sprite);
        }
        //collision, actions here
        this.enemies.forEachAlive(function(enemy){
            enemy.update();
        });

    }
};