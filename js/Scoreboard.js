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
        this.bg = this.game.add.sprite(0, 0, 'score');
        this.table();
        this.button = this.game.add.button(10, this.game.world.centerY + 200, 'btn2', this.redirect, this, 1, 0, 0);

    },
    redirect: function(){
        this.shutdown();
    },
    table: function() {
        var top10 = Main.players.sort(function(a, b) { return a.score < b.score ? 1 : -1; })
            .slice(0, 10);

        //if score is equal, then calculate spot based on survival time
        var top10new = top10.sort(function(a, b){ return a.score === b.score && a.time < b.time ? 1 : -1; });
        var i = 0;
        top10new.forEach(function(player){
            //player.name player.score player.time
            var y = 72 + 48*i;
            if(i === 0){
                var y = 72 + 60*i;
            }
            this.game.add.sprite(81, y, 'table');
            this.nameText = this.game.add.text(200, y + 32, player.name,
                {fontSize: '26px', fill: '#ffffff'});
            this.scoreText = this.game.add.text(420, y + 50, player.score,
                {fontSize: '26px', fill: '#ffffff'});
            this.timeText = this.game.add.text(650, y + 50, player.time,
                {fontSize: '26px', fill: '#ffffff'});
            this.nameText.anchor.setTo(0.5, 0.5);
            this.scoreText.anchor.setTo(0.5, 1);
            this.timeText.anchor.setTo(0.5, 1);
            i++;
        }, this);
    },

    shutdown: function() {
        this.bg = null;
        this.button = null;
        this.game.state.start("Menu");
    }

};