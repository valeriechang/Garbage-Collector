goog.provide('gc.Enemy');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require("lime.animation.RotateTo");
goog.require("lime.fill.Image");
goog.require("lime.animation.KeyframeAnimation");

gc.Enemy = function(cpu){
	lime.Sprite.call(this);
	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	this.setFill("assets/zombie0.png");
	this.dead = false;

	var movingPics = ['assets/zombie0.png', 'assets/zombie1.png'];
   					  
	var walkingAnim = new lime.animation.KeyframeAnimation().setDelay(1/8);
  for(var i = 0; i < movingPics.length; i++) {
    walkingAnim.addFrame(new lime.fill.Image(movingPics[i]).setSize(20, 20));
  }
 	this.runAction(walkingAnim);
}
goog.inherits(gc.Enemy, lime.Sprite);

gc.Enemy.prototype.setAngle = function(angle){
	if(this.x > 0){
		this.angle = -angle % 90;
	}
	else{
		this.angle = angle + 180;
	}
	this.setRotation(this.angle);
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
	var xmul = -1;
	var ymul = 1;
	if(this.x <= 0 && this.y >= 0){
		ymul = -1;
		xmul = 1;
	}
	else if(this.x <= 0 && this.y <= 0){
		xmul = -1;
	}
	this.x += xmul * Math.cos(this.angle) * this.v;
	this.y += ymul * Math.sin(this.angle) * this.v;
	this.setPosition(this.x, this.y);
	return this;
}

gc.Enemy.prototype.takeHit = function(){
	this.dead = true;
}

gc.Enemy.prototype.isDead = function(){
	return this.dead;
}

gc.Enemy.prototype.score = function(){
	return 5;
}

gc.Enemy.prototype.timeStep = function(){
	// enemies move towards the CPU
	var theta = this.angleTowards(this.cpu);
	var deg = theta * 180 / Math.PI;
	this.setAngle(deg);
	this.move();
	return this;
}
