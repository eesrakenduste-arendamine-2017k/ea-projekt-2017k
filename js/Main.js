var Main = Main || {};

Main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
Main.game.state.add("Preload", Main.Preload);
Main.game.state.add("Menu", Main.Menu);
Main.game.state.add("Scoreboard", Main.Scoreboard);
Main.game.state.add("Name", Main.Name);
Main.game.state.add("Game", Main.Game);

localStorage.name = "Unknown";
localStorage.score = 0;

Main.game.state.start("Preload");