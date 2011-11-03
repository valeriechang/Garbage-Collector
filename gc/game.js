goog.provide('gc.Game');

goog.require('lime.Scene');
goog.require('gc.Board');
goog.require('gc.SideBar');

gc.Game = function(){
	lime.Scene.call(this);
	
	this.SIDEBAR_WIDTH = gc.WIDTH/5.0;
	
	// Background layer
	var backLayer = new lime.Layer();
	this.appendChild(backLayer);
	
	// Main board
	var board = new gc.Board(gc.WIDTH - this.SIDEBAR_WIDTH, gc.HEIGHT, this).setPosition(gc.WIDTH/2.0 + this.SIDEBAR_WIDTH/2 , gc.HEIGHT/2.0);
	backLayer.appendChild(board);
	
	// Side bar
	this.sidebar = new gc.SideBar(this.SIDEBAR_WIDTH, gc.HEIGHT,this).setPosition(this.SIDEBAR_WIDTH/2.0, gc.HEIGHT/2.0);
	backLayer.appendChild(this.sidebar);
	
}
goog.inherits(gc.Game, lime.Scene);
