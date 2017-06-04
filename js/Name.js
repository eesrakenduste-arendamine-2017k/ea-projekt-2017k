var Main = Main || {};

Main.Name = function(){

};

Main.Name.prototype = {

    create: function () {
        this.name = "";
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.name, {fill: "white"});
        this.text.anchor.setTo(0.5, 0.5);

    },

    update: function () {

        if (this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown) {
            if(this.name === ""){
                localStorage.name = "Unknown";
            } else {
                localStorage.name = this.name;
            }
            this.game.state.start("Game");
        } else {
            var self = this;
            this.game.input.keyboard.onDownCallback = function (e) {
                console.log(String.fromCharCode(e.keyCode));
                self.name += String.fromCharCode(e.keyCode);
                self.text.setText(self.name);
            };
        }

    }
};