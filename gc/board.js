goog.provide('gc.Board');

goog.require('lime.RoundedRect');

gc.Board = function(game){
	lime.RoundedRect.call(this);
	
	this.game = game;
	
	this.setFill('#050');
	
}
goog.inherits(gc.Board, lime.RoundedRect);
