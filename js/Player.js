var Main = Main || {};

function Player(x, y, game){
    this.sprite = null;
    this.game = game;
    this.x = x;
    this.y = y;
};

Player.prototype = {
    create: function(){
        //sprites here
        this.sprite = this.game.add.sprite(this.x, this.y, "ship1");
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.scale.setTo(0.32, 0.32);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.angle = 90;
        this.sprite.body.collideWorldBounds = true;
    },

    update: function(){
        //collision, actions here
    }
}