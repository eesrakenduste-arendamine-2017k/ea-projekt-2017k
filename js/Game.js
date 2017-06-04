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
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
        this.game.physics.arcade.collide(this.enemies);
        this.game.physics.arcade.collide(this.enemies, this.player.sprite);
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
            this.game.physics.arcade.overlap(this.player.sprite, enemy.lasers, function(p, e){
                //p.kill();
            }, null, this);
            this.game.physics.arcade.overlap(enemy.sprite, this.player.lasers, function(e, l){
                e.kill();
                this.enemies.remove(e)
                var index = this.enemylist.indexOf(enemy);
                this.enemylist.splice(index, 1);

            }, null, this);
        }, this);

    }


    /*render: function(){
        this.game.debug.body(this.player.sprite);
        this.player.lasers.forEachAlive(this.renderGroup, this);
    },
    renderGroup: function(member){
        this.game.debug.body(member);
    }*/


};