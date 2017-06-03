var Main = Main || {};

Main.Menu = {};

Main.Menu.prototype = {

    create: function(){
        //create menu here
        game.state.start("Game");
    },

    update: function(){
        //if scoreboard button, go to scoreboard state
        //if play button, go to game state
    }

};