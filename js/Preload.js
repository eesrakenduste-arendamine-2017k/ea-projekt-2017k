var Main = Main || {};

Main.Preload = function(){};

Main.Preload.prototype = {
    preload: function(){
        //load all assets to cache and go to menu state
        this.game.state.start("Menu");
    }
};