goog.provide('gc.Game');

goog.require('lime.Scene');
goog.require('gc.Board');
goog.require('gc.SideBar');
goog.require('gc.Cpu');
goog.require('gc.Player');
goog.require('gc.Enemy');

gc.Game = function(){
	lime.Scene.call(this);
	
	this.SIDEBAR_WIDTH = gc.WIDTH/5.0;
	
	// Background layer
	var backLayer = new lime.Layer();
	this.appendChild(backLayer);
	
	// Main board
	this.board = new gc.Board(gc.WIDTH - this.SIDEBAR_WIDTH, gc.HEIGHT, this).setPosition(gc.WIDTH/2.0 + this.SIDEBAR_WIDTH/2 , gc.HEIGHT/2.0);
	backLayer.appendChild(this.board);
	
	// Side bar
	this.sidebar = new gc.SideBar(this.SIDEBAR_WIDTH, gc.HEIGHT,this).setPosition(this.SIDEBAR_WIDTH/2.0, gc.HEIGHT/2.0);
	backLayer.appendChild(this.sidebar);
	
	// Test junk
	// this.test = new lime.RoundedRect().setSize(50,50).setPosition(0,0).setFill('#000');
	// this.board.appendChild(this.test);
	
	// CPU 
	this.cpu = new gc.Cpu().setSize(40,40).setPosition(0,0);
	this.board.appendChild(this.cpu);

}
goog.inherits(gc.Game, lime.Scene);


gc.Game.prototype.start = function(){
	lime.scheduleManager.schedule(this.step_, this);
	// this.v = new goog.math.Vec2(Math.random() * .5, -.8).normalize();
}

gc.Game.prototype.step_ = function(dt){
	// this.SPEED = .1;
// 	
	// var pos = this.test.getPosition();
    // pos.x += this.v.x * dt * this.SPEED;
    // pos.y += this.v.y * dt * this.SPEED;
    // this.test.setPosition(pos);
//     
}
