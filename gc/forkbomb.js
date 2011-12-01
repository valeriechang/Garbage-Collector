goog.provide('gc.Forkbomb');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require('gc.Enemy');

gc.Forkbomb = function(cpu) {
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	
	
	this.setFill(255, 0, 0); // enemy is red... currently

}
goog.inherits(gc.Forkbomb, gc.Enemy);
