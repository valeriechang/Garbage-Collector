//make file loadable to other files
goog.provide('gc.SideBar');

//request that lime.Circle's definitions are loaded
goog.require('lime.Sprite');
goog.require('lime.fill.Fill');

//new constructor
gc.SideBar = function(width, height, game){
	//call parents constructor
	lime.Sprite.call(this);
	
	//initial healthbar values
	this.game = game;
	this.width = width;
	this.height = height;
	this.setFill('#000000');
	this.setSize(width, height);
	this.gradient = new lime.fill.LinearGradient().setDirection(0,0,0,1)
    .addColorStop(0,255,0,0,1) // from top-down, start with red color
	.addColorStop(0.5,255,255,0,1) // switch to yellow
    .addColorStop(1,0,255,0,1); // end with green
	this.healthBar = new lime.RoundedRect().setSize(width*0.5, height*0.65)
	.setPosition(0,0).setFill(this.gradient).setAnchorPoint(0.5,0.5);
	this.appendChild(this.healthBar);
		
	//initial mask values
	this.mask = new lime.Sprite().setSize(width,0).setAnchorPoint(0.5,0.5)
	.setPosition(0,height*0.32);
	this.appendChild(this.mask);
	
	this.healthBar.setMask(this.mask);
}
//define parent class
goog.inherits(gc.SideBar, lime.Sprite);

// new method for bar visibility
gc.SideBar.prototype.updateBar = function() {

	var heightCheck = this.mask.getSize().height;
	
	//when CPU is at full panic, it's all over
	/*if(heightCheck >= height*1.60)
	{
		//end game
	}*/
	
	//TODO
	//how increment health bar by 1?
	this.mask.setSize(width,heightCheck+1);
}