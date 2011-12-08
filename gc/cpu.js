goog.provide('gc.Cpu');

goog.require('lime.RoundedRect');

gc.Cpu = function(){
	lime.RoundedRect.call(this);
	
	this.onHitSound = new lime.audio.Audio('assets/Sounds/rocketexpl.mp3');

	this.REC_AMT = 1;
	this.OC_DMG = 2;
	
	this.setFill('assets/cpu.png');
	this.status = 0;
	this.isOC = false;
}
goog.inherits(gc.Cpu, lime.RoundedRect);

gc.Cpu.prototype.playOnHitSound = function() {
	this.onHitSound.stop();
	this.onHitSound.play();
}

gc.Cpu.prototype.stopOnHitSound = function() {
	this.onHitSound.stop();
}

gc.Cpu.prototype.getStatus = function(){
	return this.status;
}

gc.Cpu.prototype.takeHit = function(damage){
	this.status += damage;
	if(gc.ISSOUNDON) {
		this.playOnHitSound();
	}
}

gc.Cpu.prototype.incRecover = function(){
	if(this.isOC){
		this.status += this.OC_DMG;
	}
	else{
		this.status -= this.REC_AMT;
		if(this.status < 0){
			this.status = 0;
		} 
	}
}

gc.Cpu.prototype.startOC = function(){
	this.isOC = true;
}

gc.Cpu.prototype.endOC = function(){
	this.isOC = false;
}
