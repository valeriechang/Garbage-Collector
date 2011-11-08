goog.provide('gc.Board');

goog.require('lime.Sprite');

gc.Board = function(game){
	lime.RoundedRect.call(this);
	
	this.game = game;
	
	this.setFill('assets/circuitBoard.png');
	
}
goog.inherits(gc.Board, lime.Sprite);
