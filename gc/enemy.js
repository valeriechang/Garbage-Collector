goog.provide('gc.Enemy');

goog.require('lime.Sprite');

gc.Enemy = function(cpu){
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	this.v = 1;
	this.angle = angle;
	
}
goog.inherits(gc.Enemy, lime.Sprite);

gc.Enemy.prototype.setAngle = function(angle){
	this.angle = angle;
}
