import Game from './game';
import Player from './player';

//Create the Game
var game = new Game( 1024, 768 );

//Create the player and add it to the game
var player = new Player( 512, 384 );
game.addEntity(player);

// Start the main game loop
game.setWindow(player);
game.loop();
