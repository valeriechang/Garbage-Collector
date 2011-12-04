goog.provide('gc.Cpu');

goog.require('lime.RoundedRect');

gc.Cpu = function(){
	lime.RoundedRect.call(this);
	
	this.onHitSound = new lime.audio.Audio('assets/Sounds/rocketexpl.mp3');
	this.onDestructionSound = new lime.audio.Audio('assets/Sounds/kaboom.mp3');

	this.REC_AMT = 1;
	
	this.setFill('assets/cpu.png');
	this.status = 0;
}
goog.inherits(gc.Cpu, lime.RoundedRect);

gc.Cpu.prototype.playOnHitSound = function() {
	this.onHitSound.stop();
	this.onHitSound.play();
}

gc.Cpu.prototype.getStatus = function(){
	return this.status;
}

gc.Cpu.prototype.takeHit = function(damage){
	this.status += damage;
	this.playOnHitSound();
}

gc.Cpu.prototype.incRecover = function(){
	this.status -= this.REC_AMT;
	if(this.status < 0){
		this.status = 0;
	} 
}
