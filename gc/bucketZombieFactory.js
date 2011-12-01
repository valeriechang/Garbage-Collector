goog.provide('gc.BucketZombieFactory')

goog.require('gc.AbstractFactory');
goog.require('gc.Bucket');
goog.require('lime.Node');

gc.BucketZombieFactory = function(cpu){
	lime.Node.call(this);
	this.cpu = cpu;
}
goog.inherits(gc.BucketZombieFactory, lime.Node);

gc.BucketZombieFactory.prototype.createEnemy = function(cpu){
	return new gc.Bucket(cpu);
}
