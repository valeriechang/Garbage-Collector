goog.provide('gc.ZombieFactory')

goog.require('gc.AbstractFactory');
goog.require('gc.Enemy');
goog.require('lime.Node');

gc.ZombieFactory = function(cpu){
	lime.Node.call(this);
	this.cpu = cpu;
}
goog.inherits(gc.ZombieFactory, lime.Node);

gc.ZombieFactory.prototype.createEnemy = function(cpu){
	return new gc.Enemy(cpu);
}
