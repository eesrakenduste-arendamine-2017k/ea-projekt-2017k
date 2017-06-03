var Main = Main || {};

Main.preload = {};

Main.preload.prototype = {
    preload: function(){
        //load all assets and go to menu state
        game.state.start("Menu");
    }
};