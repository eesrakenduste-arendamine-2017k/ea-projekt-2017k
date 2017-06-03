var Main = Main || {};

Main.Menu = {};

Main.Menu.prototype = {

    preload: function(){
        //temporary
        game.state.start("Game");
    },

    create: function(){
        //create menu here

    },

    update: function(){
        //if scoreboard button, go to scoreboard state
        //if play button, go to game state
    }

};