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
	this.SPAWN_RATE = 1000; 
	this.RECOVERY_RATE = 1000;
	
	// Background layer
	this.backLayer = new lime.Layer().setPosition(gc.WIDTH/2.0 + this.SIDEBAR_WIDTH/2 , gc.HEIGHT/2.0);
	this.appendChild(this.backLayer);
	
	// Sidebar layer
	this.sideLayer = new lime.Layer().setPosition(this.SIDEBAR_WIDTH/2.0, gc.HEIGHT/2.0);
	this.appendChild(this.sideLayer);
	
	// Player Layer
	this.playerLayer = new lime.Layer().setPosition(this.SIDEBAR_WIDTH,0);
	this.appendChild(this.playerLayer);
	
	// Main board
	this.board = new gc.Board(this.getBoardWidth(), this.getBoardHeight(), this);
	this.backLayer.appendChild(this.board);
	
	// CPU 
	this.cpu = new gc.Cpu().setSize(60,60).setPosition(0,0);
	this.board.appendChild(this.cpu);
	
	// Side bar
	this.sidebar = new gc.SideBar(this.SIDEBAR_WIDTH, gc.HEIGHT, this, this.cpu);
	this.sideLayer.appendChild(this.sidebar);
	
	// Player
	this.player = new gc.Player(this).setPosition(0, 50);
	this.backLayer.appendChild(this.player);
	
	// Enemies
	this.enemies = new Array();
	
	// Enemy Factory
	this.enemyFactory = new gc.EnemyFactory(this, this.cpu);
	
	goog.events.listen(this, 'mousedown', this.moveToPos);
}
goog.inherits(gc.Game, lime.Scene);

gc.Game.prototype.start = function(){
	lime.scheduleManager.scheduleWithDelay(this.scheduleSpawn, this, this.SPAWN_RATE);
	lime.scheduleManager.scheduleWithDelay(this.recoverCpu, this, this.RECOVERY_RATE);
	lime.scheduleManager.schedule(this.step_, this);
}

gc.Game.prototype.step_ = function(dt){
	
	this.sidebar.updateBar();
	
	for(i=0; i<this.enemies.length; ++i){
		this.enemies[i].timeStep();
		var pos = this.enemies[i].getPosition();
		if(Math.abs(pos.x) < 20 && Math.abs(pos.y < 20)){
			this.backLayer.removeChild(this.enemies[i]);
		 	this.enemies.splice(i, 1);	
		 	this.cpu.takeHit(5);
		 	continue;
		}
		
		// Detect player hit
		if(this.detectCollision(this.player, this.enemies[i])){
			this.enemies[i].takeHit();
		}
		// Clean up dead zombies
		if(this.enemies[i].isDead()){
			this.backLayer.removeChild(this.enemies[i]);
		 	this.enemies.splice(i, 1);
		}
	}
	 
	// if(this.cpu.getStatus() <= 0){
		// this.endGame();
	// }
}

gc.Game.prototype.moveToPos = function(e) {
	
	var speed = this.player.getSpeed();
	var pos = this.player.getPosition();	
	var sbdist = this.board.getSize().width/2 + this.SIDEBAR_WIDTH;

	// Compensate target coordinate for board location
	var target = e.position;
	target.x -= sbdist;
	target.y -= this.board.getSize().height/2;
	
	// Calculate animation duration based on set player speed
	var distance = goog.math.Coordinate.distance(pos, target);
	var duration = Math.abs(distance)/speed;
	
	var spins = 360*this.player.getSpin()*duration;
	
	if(target.x >= -this.getBoardWidth() + this.SIDEBAR_WIDTH*2){ // Make sure player doesn't move into sidebar
  		this.player.runAction( 
    		new lime.animation.Spawn(
          		new lime.animation.MoveTo(target).setDuration(duration),
          		new lime.animation.RotateBy(-spins).setDuration(duration)
      	)
    );
   }
}

gc.Game.prototype.scheduleSpawn = function(){
	this.enemyFactory.spawnEnemies();
}

gc.Game.prototype.recoverCpu = function(){
	this.cpu.incRecover();
}

gc.Game.prototype.detectCollision = function(obj1, obj2){
	
	var x1 = obj1.getSize().width/2;
	// var x2 = obj2.getSize().width/2;
	// var y1 = obj1.getSize().height/2;
	// var y2 = obj2.getSize().height/2;
// 	
	// var rad1 = Math.sqrt(x1*x1 + y1*y1);
	// var rad2 = Math.sqrt(x2*x2 + y1*y1);
	
	var dist = goog.math.Coordinate.distance(obj1.getPosition(), obj2.getPosition());
	
	if(Math.abs(dist) <= x1/2)
		return true;
	else
		return false;
}

gc.Game.prototype.endGame = function(){
	gc.prevScene();
}

gc.Game.prototype.createEnemy = function(x,y,enemy){
	this.enemies.push(enemy);
	enemy.setPosition(x,y);
	this.backLayer.appendChild(enemy);
}

gc.Game.prototype.getBoardWidth = function(){
	return gc.WIDTH - this.SIDEBAR_WIDTH;
}

gc.Game.prototype.getBoardHeight = function(){
	return gc.HEIGHT;
}

gc.Game.prototype.getSideBarWidth = function(){
	return this.SIDEBAR_WIDTH;
}
gc.Game.prototype.getSideLayer = function(){
	return this.sideLayer;
}

gc.Game.prototype.startOC = function(){
	this.player.startOC();
}

gc.Game.prototype.endOC = function(){
	this.player.endOC();
}
