var Main = Main || {};

Main.Preload = function(){};

Main.Preload.prototype = {
    preload: function(){
        //load all assets to cache and go to menu state
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.image('menu', 'assets/menu5.png');
        this.game.load.image('score', 'assets/score1.png');
        this.game.load.image('table', 'assets/table.png');
        this.game.load.spritesheet('btn', 'assets/buttons.png', 200, 100);
        this.game.load.spritesheet('btn2', 'assets/buttons1.png', 150, 100);
        this.game.load.image('ship1', 'assets/shipBlack.png');
        this.game.load.image('ship2', 'assets/shipColor.png');
        this.game.load.image('enemy1', 'assets/enemy1.png');
        this.game.load.image('enemy2', 'assets/enemy2.png');
        this.game.load.image('laser1', 'assets/laserplayer.png');
        this.game.load.image('laser2', 'assets/laserenemy.png');
        this.game.state.start("Menu");
    }
};