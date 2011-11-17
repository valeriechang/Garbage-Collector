goog.provide('gc.Game');

goog.require('lime.Scene');
goog.require('gc.Board');
goog.require('gc.SideBar');
goog.require('gc.Cpu');
goog.require('gc.Player');
goog.require('gc.Enemy');
goog.require('gc.EnemyFactory');

gc.Game = function(){
	lime.Scene.call(this);
	
	this.SIDEBAR_WIDTH = gc.WIDTH/5.0;
	this.SPAWN_RATE = 1000; // ms/spawn
	
	// Background layer
	var backLayer = new lime.Layer();
	this.appendChild(backLayer);
	
	var playerLayer = new lime.Layer();
	this.appendChild(playerLayer);
	
	// Main board
	this.board = new gc.Board(this.getBoardWidth(), this.getBoardHeight(), this).setPosition(gc.WIDTH/2.0 + this.SIDEBAR_WIDTH/2 , gc.HEIGHT/2.0);
	backLayer.appendChild(this.board);
	
	// CPU 
	this.cpu = new gc.Cpu().setSize(60,60).setPosition(0,0);
	this.board.appendChild(this.cpu);
	
	// Side bar
	this.sidebar = new gc.SideBar(this.SIDEBAR_WIDTH, gc.HEIGHT,this).setPosition(this.SIDEBAR_WIDTH/2.0, gc.HEIGHT/2.0, this.cpu);
	backLayer.appendChild(this.sidebar);
	
	// Player
	this.player = new gc.Player().setPosition(0, 50);
	this.board.appendChild(this.player);
	
	// Enemies
	this.enemies = new Array();
	
	// Enemy Factory
	this.enemyFactory = new gc.EnemyFactory(this, this.cpu);
}
goog.inherits(gc.Game, lime.Scene);

gc.Game.prototype.start = function(){
	lime.scheduleManager.scheduleWithDelay(this.scheduleSpawn, this, this.SPAWN_RATE);
	lime.scheduleManager.scheduleWithDelay(this.)
	lime.scheduleManager.schedule(this.step_, this);
}

gc.Game.prototype.step_ = function(dt){
	// this.cpu.update();
	// this.sidebar.updateSidebar();
// 	
	// if(cpu.getStatus() >= 100){
		// endGame();
	// }     
// 	
	// this.player.timeStep();
	
	
	// for(i=0; i<this.enemies.size(); ++i){
		// enemies[i].timeStep();
	// }
}

gc.Game.prototype.scheduleSpawn = function(){
	this.enemyFactory.spawnZombies();
}
gc.Game.prototype.endGame = function(){
	
}

gc.Game.prototype.createEnemy = function(x,y,enemy){
	this.enemies.push(enemy);
	enemy.setPosition(x,y);
	this.board.appendChild(enemy);
}

gc.Game.prototype.getBoardWidth = function(){
	return gc.WIDTH - this.SIDEBAR_WIDTH;
}

gc.Game.prototype.getBoardHeight = function(){
	return gc.HEIGHT;
}
