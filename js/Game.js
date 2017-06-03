var Main = Main || {};

Main.Game = function(){
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
    },

    update: function(){
        //collision, actions here
        //this.Player.update();
    }
};