var Main = Main || {};

Main.Preload = {};

Main.Preload.prototype = {
    preload: function(){
        //load all assets to cache and go to menu state
        game.state.start("Menu");
    }
};