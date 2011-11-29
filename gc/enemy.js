goog.provide('gc.Enemy');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require("lime.animation.RotateTo");

gc.Enemy = function(cpu){
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	/*
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
*/
	this.anim = null;
	this.v = 1;
	this.angle = 0; // angle in degrees
	
	this.setFill("assets/zombie0.png");
//	this.setFill(255, 0, 0); // enemy is red... currently
}
goog.inherits(gc.Enemy, lime.Sprite);

gc.Enemy.prototype.setAngle = function(angle){
	this.angle = angle;
	if(this.anim){
		this.anim.stop();
		this.anim.clearTransition(this);
	}
	this.anim = new lime.animation.RotateTo(this.angle);
	this.anim.makeTargetProp(this);
//	this.anim.update(this.angle, this);
	return this;
}

gc.Enemy.prototype.angleTowards = function(obj){
	var position = this.getPosition();
	var other = obj.getPosition();
	var dy = position.y - other.y;
	var distance = goog.math.Coordinate.distance(position, other);
	return Math.asin(dy / distance);
}

gc.Enemy.prototype.move = function(){
	var pos = this.getPosition();
	this.x = pos.x;
	this.y = pos.y;
	var xmul = 1;
	var ymul = 1;
	if(this.x <= 0 && this.y >= 0){
		ymul = -1;
	}
	else if(this.x <= 0 && this.y <= 0){
		xmul = -1;
	}
	this.x += xmul * Math.cos(this.angle) * this.v;
	this.y += ymul * Math.sin(this.angle) * this.v;
	this.setPosition(this.x, this.y);
	return this;
}

gc.Enemy.prototype.timeStep = function(){
	// enemies move towards the CPU
	var theta = this.angleTowards(this.cpu);
	var deg = theta * 180 / Math.PI;
	this.setAngle(deg);
	this.move();
	return this;
}
//gc.Enemy.prototype.setPosition = function(x, y){
	//this.x = x;
	//this.y = y;
	//return this;
//}
