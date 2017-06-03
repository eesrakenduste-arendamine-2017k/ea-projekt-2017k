var Main = Main || {};

function Player(x, y, game){
    this.sprite = null;
    this.game = game;
    this.x = x;
    this.y = y;
    this.laserCooldown = 200;
    this.nextLaser = 0
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

        this.lasers = this.game.add.group();
        this.lasers.enableBody = true;

        this.lasers.createMultiple(10, 'laser1');
        this.lasers.setAll('checkWorldBounds', true);
        this.lasers.setAll('outOfBoundsKill', true);


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
        if(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown){
            this.shoot();
        }

    },

    shoot: function(){
        if (this.game.time.now > this.nextLaser && this.lasers.countDead() > 0){
            this.nextLaser = this.game.time.now + this.laserCooldown;

            var laser = this.lasers.getFirstDead();

            laser.reset(this.sprite.x, this.sprite.y);
            laser.pivot.x = 0.2 * this.sprite.width;
            laser.pivot.y =  this.sprite.height;
            this.game.physics.arcade.velocityFromAngle(this.sprite.angle - 90, 500, laser.body.velocity);
            laser.angle = this.sprite.angle;
        }
    }
};