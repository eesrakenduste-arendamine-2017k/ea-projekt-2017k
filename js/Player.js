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

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function(){
        //collision, actions here
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        if (this.cursors.left.isDown){
            this.sprite.body.angularVelocity = -200;
        }
        else if (this.cursors.right.isDown){
            this.sprite.body.angularVelocity = 200;
        }
        if (this.cursors.up.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.sprite.angle - 90, 300, this.sprite.body.velocity);
        } else if (this.cursors.down.isDown){
            this.game.physics.arcade.velocityFromAngle(this.sprite.angle + 90, 300, this.sprite.body.velocity);
        }

    }
};