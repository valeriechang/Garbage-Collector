goog.provide('gc.Board');

goog.require('lime.Sprite');

gc.Board = function(width, height, game){
	lime.Sprite.call(this);
	
	this.game = game;
	this.height = height;
	this.width = width;
	
	//this.setFill('assets/circuitBoard.png');
	this.setFill('#020').setOpacity(0.75);
	this.setSize(this.width, this.height);
}
goog.inherits(gc.Board, lime.Sprite);
