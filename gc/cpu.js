goog.provide('gc.Cpu');

goog.require('lime.RoundedRect');

gc.Cpu = function(){
	lime.RoundedRect.call(this);
	
	this.REC_AMT = 5;
	
	this.setFill('assets/cpu.png');
	this.status = 100;
}
goog.inherits(gc.Cpu, lime.RoundedRect);


gc.Cpu.prototype.getStatus = function(){
	return this.status;
}

gc.Cpu.prototype.takeHit = function(damage){
	this.status += damage;
}

gc.Cpu.prototype.incRecover = function(){
	this.status -= this.REC_AMT;
	if(this.status < 0){
		this.status = 0;
	} 
}
