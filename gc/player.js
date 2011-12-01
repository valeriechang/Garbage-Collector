goog.provide('gc.Player');

goog.require('gc.Game');
goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.KeyframeAnimation');

gc.Player = function(game){
	lime.Sprite.call(this);
	
	this.game = game;

	this.SPEED = 200;
	this.OC_SPEED = 600;
	this.speed = this.SPEED;
	
	this.SPIN_SPEED = 5;
	this.OC_SPIN_SPEED = 10;
	this.spinSpeed = this.SPIN_SPEED;
	
	this.setRenderer(lime.Renderer.DOM)
	    .setFill('assets/grim_stationary1.png')
	    .setPosition(-1, -1).setScale(.5)
	    .setSize(200,200);	
		
	var movingPics = ['assets/grim_swipe1.png', 'assets/grim_swipe2.png', 'assets/grim_swipe3.png', 'assets/grim_swipe4.png',
   					  'assets/grim_swipe5.png', 'assets/grim_swipe6.png', 'assets/grim_swipe7.png', 'assets/grim_swipe8.png'];
   					  
	var standingAnim = new lime.animation.KeyframeAnimation().setDelay(1/8);
    for(var i=0; i<=7;i++) {
        standingAnim.addFrame(new lime.fill.Image(movingPics[i]).setSize(200,200));
   	}
   	this.runAction(standingAnim);
}	
goog.inherits(gc.Player, lime.Sprite);

gc.Player.prototype.getSpeed = function(){
	return this.speed;
}

gc.Player.prototype.setSpeed = function(s){
	this.speed = s;
}

gc.Player.prototype.getSpin = function(){
	return this.spinSpeed;
}

gc.Player.prototype.startOC = function(){
	this.speed = this.OC_SPEED;
	this.spinSpeed = this.OC_SPIN_SPEED;
}

gc.Player.prototype.endOC = function(){
	this.speed = this.SPEED;
	this.spinSpeed = this.SPIN_SPEED;
}
