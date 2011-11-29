goog.provide('gc.Player');

goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.KeyframeAnimation');

gc.Player = function(game){
	lime.Sprite.call(this);
	
	//this.game = game;
	//this.setAnchorPoint(0, 0);
	//this.setFill('assets/grim_stationary1.png');
	//this.setSize(600,600);
	
	this.setRenderer(lime.Renderer.DOM)
	    .setFill('assets/grim_stationary1.png')
	    .setPosition(-1, -1).setScale(.5)
	    .setSize(200,200);	
		
	var movingPics = ['assets/grim_swipe1.png', 'assets/grim_swipe2.png', 'assets/grim_swipe3.png', 'assets/grim_swipe4.png',
   					  'assets/grim_swipe5.png', 'assets/grim_swipe6.png', 'assets/grim_swipe7.png', 'assets/grim_swipe8.png'];
   					  
	var standingAnim = new lime.animation.KeyframeAnimation().setDelay(1/8);
    for(var i=0; i<=5;i++) {
        standingAnim.addFrame(new lime.fill.Image(movingPics[i]).setSize(200,200));
   	}
   	this.runAction(standingAnim);
}	
goog.inherits(gc.Player, lime.Sprite);

gc.Player.prototype.moveToPos = function(e) {
  	this.player.runAction(
    	new lime.animation.Spawn(
          	new lime.animation.MoveTo(e.position).setDuration(2),
          	new lime.animation.RotateBy(-720).setDuration(2)
      	)
    );
}
