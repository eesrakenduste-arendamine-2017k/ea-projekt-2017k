var Main = Main || {};

Main.Enemy = function(){
    this.x = 0;
    this.y = 0;
    this.sprite = null
};

Main.Enemy.prototype = {
    create: function(){
        //sprites here
        this.sprite = this.game.add.sprite(this.x, this.y, 'enemy');

    },

    update: function(){
        //collision, actions here

    }
};