var Main = Main || {};

Main.Game = function(){
    this.enemies = this.game.add.group();
    this.enemies_onscreen = 5;
    this.timer = 0;
    this.spawn_rate = 5;
};

Main.Game.prototype = {
    create: function(){
        //sprites here
        this.Player.create();
    },

    update: function(){
        this.timer += 1;
        if(this.timer % (60*this.spawn_rate) === 0 && this.enemies.length <= this.enemies_onscreen){
            var enemy = this.Enemy();
            enemy.create();
            this.enemies.add(enemy);
        }
        //collision, actions here
        this.Player.update();
        this.enemies.forEachAlive(function(enemy){
            enemy.update();
        });
    }
};