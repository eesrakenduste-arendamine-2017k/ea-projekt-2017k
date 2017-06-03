function Enemy(x, y, game){
    this.x = x;
    this.y = y;
    this.game = game;
    this.sprite = null;
}

Enemy.prototype = {
    create: function(){
        //sprites here
        this.sprite = this.game.add.sprite(this.x, this.y, 'enemy1');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.scale.setTo(0.25, 0.25);
        this.sprite.angle = Math.floor(Math.random()*360);

    },

    update: function(player){
        //collision, actions here
        //this.game.physics.arcade.angleBetween(this.sprite, player.sprite);
        this.game.physics.arcade.moveToObject(this.sprite, player, 200);

    }
};