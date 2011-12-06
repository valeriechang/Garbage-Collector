goog.provide('gc.Game');

goog.require('lime.animation.Animation');
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('gc.Board');
goog.require('gc.Cpu');
goog.require('gc.Enemy');
goog.require('gc.EnemyFactory');
goog.require('gc.Player');
goog.require('gc.SideBar');

gc.Game = function(){
	lime.Scene.call(this);
	
	this.SIDEBAR_WIDTH = gc.WIDTH/5.0;
	this.SPAWN_RATE = 1000; 
	this.RECOVERY_RATE = 3000;
	
	this.points = 0; // Player's accumulated score over the course of the game 
	
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
	
	 // label for score message
	var x_lbl = -this.board.getSize().width/2;
	var y_lbl = -this.board.getSize().height/2;
	var offset = 35;
    var score_lbl = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#4f96ed').setFontSize(10).
        setPosition(x_lbl, y_lbl).setText('Score:').setAnchorPoint(0, 0).setFontWeight(700);
    this.backLayer.appendChild(score_lbl);

    // score message label
    this.score = new lime.Label().setFontColor('#fff').setFontSize(10).setText(0).setPosition(x_lbl + offset, y_lbl)
        .setAnchorPoint(0, 0).setFontWeight(700);
    this.backLayer.appendChild(this.score);
	
	goog.events.listen(this, ['mousedown', 'touchstart'], this.moveToPos);
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
		var cpuTop = this.cpu.getPosition().y + this.cpu.getSize().height/2;
		var cpuSide = this.cpu.getPosition().x + this.cpu.getSize().width/2;
		
		if(Math.abs(pos.x) < cpuSide && Math.abs(pos.y) < cpuTop){
			this.cpu.takeHit(3); //TODO REPLACE THIS WITH CALL TO enemy.hit() 
			this.backLayer.removeChild(this.enemies[i]);
		 	this.enemies.splice(i, 1);	
		 	continue;
		}
		// Detect player hitting an enemy
		if(this.detectCollision(this.player, this.enemies[i])){
			this.enemies[i].takeHit();
		}
		// Clean up dead zombies
		if(this.enemies[i].isDead()){
			this.addScore(this.enemies[i].score());
			this.backLayer.removeChild(this.enemies[i]);
		 	this.enemies.splice(i, 1);
		}
	}
	 
	//if (this.cpu.getStatus() >= 5){
	if(this.cpu.getStatus() >= 100){
		this.endGame();
	}
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
		if(!this.player.getIsOverclockOn()){
			if(duration > 1.5) {
				this.player.playLongMoveSound();
			} else {
				this.player.playNormalMoveSound();
			}
		} else {
			if(duration > 1.5) {
				this.player.playLongMoveSound();
			} else {
				this.player.playOverclockMoveSound();
			}
		}
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
	var x1 = obj1.getSize().width/4;
	var dist = goog.math.Coordinate.distance(obj1.getPosition(), obj2.getPosition());
	
	if(Math.abs(dist) <= x1)
		return true;
	else
		return false;
}

gc.Game.prototype.endGame = function(){
	//goog.events.unlisten(this.board, ['mousedown', 'touchstart'], this.board.pressHandler_);
	lime.scheduleManager.unschedule(this.scheduleSpawn, this);
	lime.scheduleManager.unschedule(this.recoverCpu, this);
	lime.scheduleManager.unschedule(this.step_, this);
	gc.showGameOver();
	
	lime.scheduleManager.callAfter(this.enterHighScores, this, 1000)
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
	this.cpu.startOC();
}

gc.Game.prototype.endOC = function(){
	this.player.endOC();
	this.cpu.endOC();
}

gc.Game.prototype.addScore = function(s){
	this.points += s;
	this.score.setText(this.points);
}

gc.Game.prototype.enterHighScores = function() {
	var name = prompt('Please enter in your name: ');
	this.hs = new gc.hsTracker();
	this.hs.add(name,this.points);
	lime.scheduleManager.callAfter(gc.showHighscores, this, 3000);
}
