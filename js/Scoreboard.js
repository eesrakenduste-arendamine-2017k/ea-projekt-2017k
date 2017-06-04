var Main = Main || {};

Main.Scoreboard = function(){
    this.button = null;
    this.nameText = null;
    this.scoreText = null;
    this.timeText = null;
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
    },
    table: function() {
        this.players = JSON.parse(localStorage.getItem('players'));
        var top10 = this.players.sort(function(a, b) { return a.score < b.score ? 1 : -1; })
            .slice(0, 10);
        var i = 0;
        top10.forEach(function(player){
            //player.name player.score player.time
            this.game.add.sprite(60, 60 + 60*i, 'table');
            this.nameText = this.game.add.text(80, 60 + 60*i, player.name,
                {fontSize: '26px', fill: '#ffffff'});
            this.scoreText = this.game.add.text(160, 60 + 60*i, player.score,
                {fontSize: '26px', fill: '#ffffff'});
            this.timeText = this.game.add.text(320, 60 + 60*i, player.time,
                {fontSize: '26px', fill: '#ffffff'});
            i++;
        });
    }

};