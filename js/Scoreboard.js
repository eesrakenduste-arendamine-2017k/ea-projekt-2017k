var Main = Main || {};

Main.Scoreboard = function(){
    this.button = null;
};

Main.Scoreboard.prototype = {

    create: function(){
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        Main.players.forEach(function (p){
            console.log(p.name, p.score, p.time);
        });

        this.bg = this.game.add.sprite(0, 0, 'score');
        this.button = this.game.add.button(20, this.game.world.centerY + 200, 'btn2', this.redirect, this, 1, 0, 0);
    },

    update: function(){

    },

    redirect: function(){
        this.game.state.start("Menu");
    }

};