goog.provide('gc.Enemy');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");

gc.Enemy = function(cpu){
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	var x = Math.random() * gc.WIDTH;
	var y = Math.random() * gc.HEIGHT;

	if(x < gc.WIDTH / 2){
		x -= gc.WIDTH / 2 - 50;
	}
	else{
		x += gc.WIDTH / 2 + 50;
	}
	if(y < gc.HEIGHT / 2){
		y -= gc.HEIGHT / 2 - 50;
	}
	else{
		y += gc.HEIGHT / 2 + 50;
	}
	this.x = x;
	this.y = y;

	this.v = 1;
	this.angle = angle; // angle in degrees
	
	
	this.setFill(255, 0, 0); // enemy is red... currently
}
goog.inherits(gc.Enemy, lime.Sprite);

gc.Enemy.prototype.setAngle = function(angle){
	this.angle = angle;
}

gc.Enemy.prototype.angleTowards = function(obj){
	var position = this.getPosition();
	var other = obj.getPosition();
	var dy = position.y - other.y;
	var distance = goog.math.Coordinate.distance(position, other);
	return Math.asin(dy / distance);
}

gc.Enemy.prototype.move = function(){
	this.x += Math.cos(this.angle * Math.PI / 180) * this.v;
	this.y += Math.sin(this.angle * Math.PO / 180) * this.v;
	this.setPosition(this.x, this.y);
}

gc.Enemy.prototype.timeStep = function(){
	// enemies move towards the CPU
	var theta = this.angleTowards(cpu);
	var deg = theta * 180 / Math.PI;
	this.setAngle(deg);
	this.move();
}
