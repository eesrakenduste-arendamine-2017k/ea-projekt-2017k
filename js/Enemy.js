function Enemy(x, y, game){
    this.x = x;
    this.y = y;
    this.game = game;
    this.sprite = null;
}

Enemy.prototype = {
    create: function(){
        //sprites here
        var random = Math.floor((Math.random() * 2) + 1);
        if(random === 1){
            this.sprite = this.game.add.sprite(this.x, this.y, 'enemy1');
        } else if (random === 2){
            this.sprite = this.game.add.sprite(this.x, this.y, 'enemy2');
        }

        this.game.physics.arcade.enable(this.sprite);
        this.sprite.scale.setTo(0.25, 0.25);
        this.sprite.angle = Math.floor(Math.random()*360);

    },

    update: function(player){
        //collision, actions here
        this.sprite.angle = this.game.physics.arcade.angleBetweenCenters(this.sprite, player) * (180/Math.PI) + 90;
        if(this.game.physics.arcade.distanceBetween(this.sprite, player) < 200 ){
            this.fire();
            this.game.physics.arcade.moveToObject(this.sprite, player, 0);
        } else {
            this.game.physics.arcade.moveToObject(this.sprite, player, 50);
        }

    },

    fire: function(){
        console.log("pewpew");
    }
};