var Main = Main || {};

Main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

Main.game.state.add("Preload");
Main.game.state.add("Menu");
Main.game.state.add("Scoreboard");
Main.game.state.add("Game");

Main.game.state.start("Preload");