goog.provide('gc.Cpu');

goog.require('lime.RoundedRect');

gc.Cpu = function(){
	lime.RoundedRect.call(this);
	
	this.setFill('assets/cpu.png');
}
goog.inherits(gc.Cpu, lime.RoundedRect);
