var Main = Main || {};

Main.Name = function(){
    this.askText = null;
};

Main.Name.prototype = {

    create: function () {
        this.timer = 0;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.bg = this.game.add.sprite(0, 0, 'namebg');
        this.askText = this.game.add.text(this.game.world.width / 3, this.game.world.centerY - 100, 'Enter name and pick ship',
            {fontSize: '26px', fill: '#ffffff'});
        this.name = "";
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.name, {fill: "white"});
        this.text.anchor.setTo(0.5, 0.5);
        this.ship1 = this.game.add.sprite(this.game.world.width * 0.2, this.game.world.height * 0.50, 'ship1');
        this.ship1.scale.setTo(0.75, 0.75);
        this.ship1.inputEnabled = true;
        this.ship2 = this.game.add.sprite(this.game.world.width * 0.7, this.game.world.height * 0.50, 'ship2');
        this.ship2.scale.setTo(0.75, 0.75);
        this.ship2.inputEnabled = true;

        this.ship1.events.onInputDown.add(this.onDown, this);
        this.ship2.events.onInputDown.add(this.onDown, this);

    },

    update: function () {
        this.timer +=1;
        if (this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).isDown){
            if(this.timer % 6 === 0){
                this.name = this.name.slice(0, -1);
                this.text.setText(this.name);
            }
        } else {
            var self = this;
            this.game.input.keyboard.onDownCallback = function (e) {
                if(!this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.ALT).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown &&
                    !this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
                    if(self.name.length < 6){
                        self.name += String.fromCharCode(e.keyCode);
                        self.text.setText(self.name);
                    }
                }
            };
        }

    },

    onDown: function(sprite, pointer){
        localStorage.ship = sprite.key;
        if(this.name === ""){
            Main.playerdata.name = "Unknown";
        } else {
            Main.playerdata.name = this.name;
        }
        this.shutdown();
    },

    shutdown: function(){
        this.game.input.keyboard.onDownCallback = "";
        this.game.state.start('Game');
    }
};