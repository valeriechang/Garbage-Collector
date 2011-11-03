goog.provide('gc.SideBar');

goog.require('lime.Sprite');

gc.SideBar = function(width, height, game){
	lime.Sprite.call(this);
	
	this.game = game;
	this.width = width;
	this.height = height;
	
	this.setFill('#000');
	this.setSize(width, height);
}
goog.inherits(gc.SideBar, lime.Sprite);
