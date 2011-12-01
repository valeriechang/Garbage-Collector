goog.provide('gc.Bucket');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require('gc.Enemy');

gc.Bucket = function(cpu) {
	lime.Sprite.call(this);
	
	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	this.dead = false;
	this.hit = false;
	
	this.setFill('assets/zombieBucket0.png'); // enemy is red... currently
}
goog.inherits(gc.Bucket, gc.Enemy);

gc.Bucket.prototype.takeHit = function(){
	this.setFill("assets/zombie0.png");
	if(this.hit == false){
		this.hit = true;
	}
	else{
		this.dead = true;
	}
}

gc.Enemy.prototype.score = function(){
	return 10;
}

gc.Bucket.prototype.isDead = function(){
	return this.dead;
}
