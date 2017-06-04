function Enemy(x, y, game){
    this.x = x;
    this.y = y;
    this.game = game;
    this.sprite = null;
    this.laserCooldown = 1000;
    this.nextLaser = 0;
    this.onScreen = false;
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
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.angle = Math.floor(Math.random()*360);
        this.lasers = this.game.add.group();
        this.lasers.enableBody = true;
        this.lasers.createMultiple(1, 'laser2');
        this.lasers.setAll('checkWorldBounds', true);
        this.lasers.setAll('outOfBoundsKill', true);
    },

    update: function(player){
        //collision, actions here
        this.sprite.angle = this.game.physics.arcade.angleBetweenCenters(this.sprite, player) * (180/Math.PI) + 90;

        if(this.onScreen){
            if(this.sprite.key === 'enemy1'){
                if(this.game.physics.arcade.distanceBetween(this.sprite, player) < 200 ){
                    this.fire();
                    this.game.physics.arcade.moveToObject(this.sprite, player, 0);
                } else {
                    this.game.physics.arcade.moveToObject(this.sprite, player, 100);
                }
            } else if(this.sprite.key === 'enemy2') {
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
                this.fire();
                this.sprite.body.immovable = true;
            }
        } else {
            this.onSpawn();
        }


    },
    onSpawn: function(){
        this.sprite.rotation = this.game.physics.arcade.moveToXY(
            this.sprite,
            this.game.world.centerX,
            this.game.world.centerY,
            150,
            500
        );
        if(this.sprite.x - 20 >= 0 && this.sprite.x + 20 <= this.game.world.width &&
            this.sprite.y - 20 >= 0 && this.sprite.y + this.sprite.height + 20 <= this.game.world.height){
            this.onScreen = true;
        }
    },

    fire: function() {
        if (this.game.time.now > this.nextLaser && this.lasers.countDead() > 0) {
            this.nextLaser = this.game.time.now + this.laserCooldown;

            var laser = this.lasers.getFirstDead();
            laser.reset(this.sprite.x, this.sprite.y);
            if(this.sprite.key === 'enemy1'){
                laser.scale.setTo(1, 0.25);
            }
            laser.body.setSize(4, 17, 0, 10);
            laser.pivot.x = 0.2 * this.sprite.width;
            laser.pivot.y = this.sprite.height;
            this.game.physics.arcade.velocityFromAngle(this.sprite.angle - 90, 200, laser.body.velocity);
            laser.angle = this.sprite.angle;
        }
    }
};