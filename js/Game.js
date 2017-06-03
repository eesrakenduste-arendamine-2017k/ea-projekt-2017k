var Main = Main || {};

Main.Game = function(){};

Main.Game.prototype = {
    create: function(){
        //sprites here
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.bg = this.game.add.sprite(0,0, 'bg');
        //this.Player.create();
    },

    update: function(){
        //collision, actions here
        //this.Player.update();
    }
};