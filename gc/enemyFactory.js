goog.provide('gc.EnemyFactory');

goog.require('gc.ZombieFactory');
goog.require('gc.BucketZombieFactory');

gc.EnemyFactory = function(game, cpu){
	this.game = game;
	this.cpu = cpu;
	this.zombieDensity = 3;
	this.bucketZombieDensity = 1;
	this.forkDensity = .5;
	this.philosopherDensity = .1;
	
	this.zombieProb = 15;
	this.bucketZombieProb = 5;
	this.boardWidth = game.getBoardWidth();
	this.boardHeight = game.getBoardHeight();
}

gc.EnemyFactory.prototype.spawnEnemies = function(){
	
	// Spawn regular zombies
	var zombieFactory = new gc.ZombieFactory(this.cpu);
	this.createEnemyType(zombieFactory, this.zombieDensity, this.zombieProb);
	this.zombieDensity += .01;
	
	var bucketFactory = new gc.BucketZombieFactory(this.cpu);
	this.createEnemyType(bucketFactory, this.bucketZombieDensity, this.bucketZombieProb);
	this.bucketZombieDensity += .01;
}

gc.EnemyFactory.prototype.createEnemyType = function(factory, density, prob){
	var side = this.boardWidth/2;
	var top = this.boardHeight/2;
	
	for(i=0; i<=Math.floor(Math.random()*density); ++i){
		
		// Spawn somewhere on right side
		if(this.spawnProb(prob) > 0){
			var rightEnemy = factory.createEnemy(this.cpu).setSize(20,20);
			this.game.createEnemy(side, Math.floor(Math.random()*top - top),rightEnemy);
		}
		
		// Spawn somewhere on left side
		if(this.spawnProb(prob) > 0){
			var leftEnemy = factory.createEnemy(this.cpu).setSize(20,20);
			this.game.createEnemy(-side, Math.floor(Math.random()*top - top),leftEnemy);
		}
		
		// Spawn somewhere on bottom 
		if(this.spawnProb(prob) > 0){
			var bottomEnemy = factory.createEnemy(this.cpu).setSize(20,20);
			this.game.createEnemy(Math.floor(Math.random()*side - side), top, bottomEnemy);
		}
		
		// Spawn somewhere on top
		if(this.spawnProb(prob) > 0){
			var bottomEnemy = factory.createEnemy(this.cpu).setSize(20,20);
			this.game.createEnemy(Math.floor(Math.random()*side - side), -top, bottomEnemy);
		}
	}
}

gc.EnemyFactory.prototype.spawnProb = function(prob){
	var offset = 100-prob;
	return Math.floor(Math.random()*100 - offset);
}
