goog.provide('gc.Bucket');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require('gc.Enemy');

gc.Bucket = function(cpu) {
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	
	
	this.setFill('assets/zombieBucket0.png'); // enemy is red... currently
}
goog.inherits(gc.Bucket, gc.Enemy);
