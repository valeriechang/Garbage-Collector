goog.provide('gc.Player');

goog.require('lime.Sprite');

gc.Player = function(game){
	lime.Sprite.call(this);
	
	this.game = game;
	//this.setAnchorPoint(0, 0);
	this.setFill('assets/grim_stationary1.png');
	this.setSize(100,100);
}	
goog.inherits(gc.Player, lime.Sprite);

/*
this.Player.prototype.enableSimulation() {
	this.v = 0;
	this.a = 0;
}
*/
