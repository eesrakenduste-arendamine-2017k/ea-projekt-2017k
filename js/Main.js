var Main = Main || {};
//localStorage.clear();
Main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
Main.players = JSON.parse(localStorage.getItem("players"));
if(Main.players === null){
    Main.players = [];
}
console.log(Main.players);

Main.playerdata = {name: "", score: 0, time: 0};
Main.game.state.add("Preload", Main.Preload);
Main.game.state.add("Menu", Main.Menu);
Main.game.state.add("Scoreboard", Main.Scoreboard);
Main.game.state.add("Name", Main.Name);
Main.game.state.add("Game", Main.Game);

Main.game.state.start("Preload");