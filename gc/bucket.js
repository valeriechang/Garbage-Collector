goog.provide('gc.Bucket');

goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require('gc.Enemy');

gc.Bucket = function(cpu) {
	gc.Enemy.call(this);
	
	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	this.dead = false;
	this.hit = false;
	this.hittable = true;
	
	this.setFill('assets/zombieBucket0.png'); // enemy is red... currently
}
goog.inherits(gc.Bucket, gc.Enemy);

gc.Bucket.prototype.takeHit = function(){
	this.setFill("assets/zombie0.png");
	if(this.hit == false){
		this.hit = true;
		this.hittable = false;
	}
	else if(this.hittable){
		this.dead = true;
	}
	lime.scheduleManager.scheduleWithDelay(this.makeKillable, this, 500, 1);

}

gc.Enemy.prototype.score = function(){
	return 10;
}	

gc.Bucket.prototype.isDead = function(){
	return this.dead;
}

gc.Bucket.prototype.makeKillable = function(){
	this.hittable = true;
}
