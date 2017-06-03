var Main = Main || {};

Main.Preload = function(){};

Main.Preload.prototype = {
    preload: function(){
        //load all assets to cache and go to menu state
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.image('ship1', 'assets/shipBlack.png');
        this.game.load.image('ship2', 'assets/shipColor.png');
        this.game.load.image('enemy1', 'assets/enemy1.png');
        this.game.load.image('enemy2', 'assets/enemy2.png');
        this.game.load.image('laser1', 'assets/laserplayer.png');
        this.game.load.image('laser2', 'assets/laserenemy.png');
        this.game.state.start("Menu");
    }
};