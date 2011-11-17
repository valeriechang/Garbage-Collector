//make file loadable to other files
goog.provide('gc.SideBar');

//request that lime.SideBar definitions are loaded
goog.require('lime.Button');
goog.require('lime.GlossyButton');
goog.require('lime.Circle');
goog.require('lime.fill.Fill');
goog.require('lime.Sprite');
goog.require('lime.animation.ColorTo');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.Spawn');

//new constructor
gc.SideBar = function (width, height, game, cpu) {
	//call parents constructor
	lime.Sprite.call(this);

	//initial sideBar values
	this.game = game;
	this.cpu = cpu;
	this.width = width;
	this.height = height;
	this.setFill('#000000');
	this.setSize(width, height);
	
	//initial healthBar values
	var gradient = new lime.fill.LinearGradient().setDirection(0, 0, 0, 1).
		addColorStop(0, 255, 0, 0, 1).addColorStop(0.5, 255, 255, 0, 1).
		addColorStop(1, 0, 255, 0, 1);
	var healthBar = new lime.RoundedRect().setSize(width * 0.5, height * 0.65).
		setPosition(0, 0).setFill(gradient).setAnchorPoint(0.5, 0.5);
	this.appendChild(healthBar);

	//initial mask values
	this.mask = new lime.Sprite().setSize(width, 0).setAnchorPoint(0.5, 0.5).
		setPosition(0, height * 0.32);
	this.appendChild(this.mask);

	healthBar.setMask(this.mask);

	//initial soundButton values
	var isSoundOnOff = false;
	//var bgMusic = new lime.audio.Audio('assets/Sounds/Song6.mp3');
	var soundBtnUp = new lime.Sprite().setFill('assets/soundButton.gif').
		setSize(25, 25);
	var soundBtnDown = new lime.Sprite().setFill('#CDB7B5').
		setSize(25, 25);
	var soundBtn = new lime.Button(soundBtnUp, soundBtnDown).
		setPosition(0, -132);
	// console.log(soundBtn.getState());
	this.appendChild(soundBtn);
	goog.events.listen(soundBtn, ['touchstart', 'mousedown'], function () {
		//if(!this.isSoundOnOff) {
			console.log(isSoundOnOff);
			//this.soundButton.setFill('#8B3626');
			//this.bgMusic.stop();
			//this.bgMusic.play();
			// this.isSoundOnOff = true;
			//gc.Game.replaceScene(this);
		//} else {
			// console.log(this.isSoundOnOff);
			//this.soundButton.setFill('images/soundButton.gif');
			//this.bgMusic.stop();
			// this.isSoundOnOff = false;
			// gc.Game.replaceScene(this);
		// }
    });

	//initial cpuOverButton values
	var cpuOverBtnUp = new lime.Sprite().setSize(40, 40).
		setFill('#660000');
	var cpuOverBtnDown = new lime.Sprite().setSize(40, 40).
		setFill('#5c5c5c');
	var cpuOverBtn = new lime.Button().
		setPosition(0, 132).setUpState(cpuOverBtnUp).setDownState(cpuOverBtnDown);
		cpuOverBtn.appendChild(cpuOverBtnUp);
		cpuOverBtn.appendChild(cpuOverBtnDown);
		this.appendChild(cpuOverBtn);
	//console.log(isSoundOnOff);
	goog.events.listen(cpuOverBtn, ['touchstart', 'mousedown'], function () {
		console.log(isSoundOnOff);
	});
};

//define parent class
goog.inherits(gc.SideBar, lime.Sprite);

// new method for bar visibility
gc.SideBar.prototype.updateBar = function () {

	var heightGrowth = (this.cpu.getStatus()*0.01)*this.height;

	this.mask.setSize(this.width, heightGrowth);
};

//add some interaction
gc.SideBar.prototype.turnSoundOnOff = function () {
	if(!isSoundOnOff) {
		this.setFill('#8B3626');
		this.bgMusic.stop();
		this.bgMusic.play();
		this.isSoundOnOff = true;
	} else {
		this.setFill('images/soundButton.gif');
		this.bgMusic.stop();
		this.isSoundOnOff = false;
	}
};

/*gc.Game.prototype.overclockOnOff = function() {

}*/