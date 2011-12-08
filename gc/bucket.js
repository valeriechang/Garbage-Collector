goog.provide('gc.Bucket');

goog.require('gc.Game');
goog.require('lime.Sprite');
goog.require("goog.math.Coordinate");
goog.require('gc.Enemy');

gc.Bucket = function(cpu) {
	gc.Enemy.call(this);
	
	this.onZombieHitSound = new lime.audio.Audio('assets/Sounds/splat.mp3');
	this.bucketHeadHit = new lime.audio.Audio('assets/Sounds/bucketHead.mp3');

	this.cpu = cpu;
	this.v = 1;
	this.angle = 0; // angle in degrees
	this.dead = false;
	this.hit = false;
	this.hittable = true;
	
	//this.setFill('assets/zombieBucket0.png'); // enemy is red... currently
	this.setupAnimation();
}
goog.inherits(gc.Bucket, gc.Enemy);

gc.Bucket.prototype.playBucketHeadHitSound = function() {
	this.bucketHeadHit.stop();
	this.bucketHeadHit.play();
}

gc.Bucket.prototype.stopBucketHeadHitSound = function() {
	this.bucketHeadHit.stop();	
}

gc.Bucket.prototype.playOnZombieHitSound = function() {
	this.onZombieHitSound.stop();
	this.onZombieHitSound.play();
}

gc.Bucket.prototype.stopOnZombieHitSound = function() {
	this.onZombieHitSound.stop();
}

gc.Bucket.prototype.setupAnimation = function(){
	if(this.hit == false)
	{
		var movingPics = ['assets/zombieBucket0.png', 'assets/zombieBucket1.png'];
	}
   	else
   	{
   		var movingPics = ['assets/zombie0.png', 'assets/zombie1.png'];
	}			  
	var walkingAnim = new lime.animation.KeyframeAnimation().setDelay(1/8);
  for(var i = 0; i < movingPics.length; i++) {
    walkingAnim.addFrame(new lime.fill.Image(movingPics[i]).setSize(20, 20));
  }
 	this.runAction(walkingAnim);
}

gc.Bucket.prototype.takeHit = function(){
	this.setFill("assets/zombie0.png");
	if(this.hit == false){
		if(gc.ISSOUNDON) {
			this.playBucketHeadHitSound();
		}
		this.hit = true;
		this.hittable = false;
	}
	else if(this.hittable){
		if(gc.ISSOUNDON) {
			this.playOnZombieHitSound();
		}
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
