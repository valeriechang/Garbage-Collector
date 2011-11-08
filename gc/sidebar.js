goog.provide('gc.SideBar');

goog.require('lime.RoundedRect');

gc.SideBar = function(game){
	lime.RoundedRect.call(this);
	
	this.game = game;
	
	this.setFill('#000');
}
goog.inherits(gc.SideBar, lime.RoundedRect);
