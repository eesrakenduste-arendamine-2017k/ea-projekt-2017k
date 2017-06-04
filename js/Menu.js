var Main = Main || {};

Main.Menu = function(){
    this.button = null;
    this.button2 = null;
};

Main.Menu.prototype = {

    create: function(){
        //create menu here
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Main.playerdata = {name: "", score: 0, time: 0};
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.bg = this.game.add.sprite(0,0, 'menu');
        this.button = this.game.add.button(this.game.world.centerX - 95, 300, 'btn', this.startGame, this, 2, 3, 3);
        this.button2 = this.game.add.button(this.game.world.centerX - 95, 380, 'btn', this.scoreboard, this, 1, 0, 0);
    },

    startGame: function(){
        this.game.state.start("Name");
    },

    scoreboard: function(){
        this.game.state.start("Scoreboard");
    }

};