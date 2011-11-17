goog.provide('gc.EnemyFactory');

gc.EnemyFactory = function(game, cpu){
	this.game = game;
	this.zombieDensity = 1;
	this.boardWidth = game.getBoardWidth();
	this.boardHeight = game.getBoardHeight();
}

gc.EnemyFactory.prototype.spawnZombies = function(){
	// Spawn somewhere on the right side
	for(i=0; i<=Math.floor(Math.random()*this.zombieDensity); ++i){
		
		// Spawn somewhere on right side
		if(this.spawnProb() > 0){
			var rightEnemy = new gc.Enemy(this.game.cpu).setSize(20,20);
			this.game.createEnemy(this.boardWidth/2, Math.floor(Math.random()*this.boardHeight - this.boardHeight/2),rightEnemy);
		}
		
		// Spawn somewhere on left side
		if(this.spawnProb() > 0){
			var leftEnemy = new gc.Enemy(this.game.cpu).setSize(20,20);
			this.game.createEnemy(-this.boardWidth/2, Math.floor(Math.random()*this.boardHeight - this.boardHeight/2),leftEnemy);
		}
		
		// Spawn somewhere on bottom 
		if(this.spawnProb() > 0){
			var bottomEnemy = new gc.Enemy(this.game.cpu).setSize(20,20);
			this.game.createEnemy(Math.floor(Math.random()*this.boardWidth - this.boardWidth/2), this.boardHeight/2, bottomEnemy);
		}
		
		// Spawn somewhere on top
		if(this.spawnProb() > 0){
			var bottomEnemy = new gc.Enemy(this.game.cpu).setSize(20,20);
			this.game.createEnemy(Math.floor(Math.random()*this.boardWidth - this.boardWidth/2), -this.boardHeight/2, bottomEnemy);
		}
		
		this.zombieDensity += .001;
	}
}

gc.EnemyFactory.prototype.spawnProb = function(){
	return Math.floor(Math.random()*100 - 70);
}
