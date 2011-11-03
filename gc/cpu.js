goog.provide('gc.Cpu');

goog.require('lime.RoundedRect');

gc.Cpu = function(){
	lime.RoundedRect.call(this);
	
	this.setFill('assets/cpu.png');
	this.status = 0;
}
goog.inherits(gc.Cpu, lime.RoundedRect);


gc.Cpu.prototype.getStatus = function(){
	return this.status;
}

gc.Cpu.prototype.takeHit = function(damage){
	this.status += damage;
}
