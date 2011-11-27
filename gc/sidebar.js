//make file loadable to other files
goog.provide('gc.SideBar');

//request that lime.SideBar definitions are loaded
goog.require('lime.Button');
goog.require('lime.GlossyButton');
goog.require('lime.fill.Fill');
goog.require('lime.Sprite');

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
	this.healthBarWidth = this.width * 0.5;
	this.healthBarHeight = this.height * 0.65;
	var btnWidth = this.width * 0.65;
	var btnHeight = this.height * 0.10;
	var btnPosY = (this.healthBarHeight + btnHeight + this.height * 0.05) / 2;
	
	//initial healthBar values
	var gradient = new lime.fill.LinearGradient().setDirection(0, 0, 0, 1).
		addColorStop(0, 255, 0, 0, 1).addColorStop(0.5, 255, 255, 0, 1).
		addColorStop(1, 0, 255, 0, 1);
	this.healthBar = new lime.RoundedRect().
		setSize(this.healthBarWidth, this.healthBarHeight).setFill(gradient);
	this.appendChild(this.healthBar);
	
	//initial mask values
	this.mask = new lime.Sprite().setSize(this.healthBarWidth, 0).
		setPosition(0, (this.healthBarHeight / 2));
	this.appendChild(this.mask);
	this.healthBar.setMask(this.mask);
	
	//initial soundButton values
	var bgMusic = new lime.audio.Audio('assets/Sounds/Song6.mp3');
	var isMusicPlaying = bgMusic.isPlaying();
	
	var soundBtnBg = new lime.Sprite().setFill('assets/sound_0.png').
		setSize(25, 20).setPosition(0, -btnPosY);
	this.appendChild(soundBtnBg);
	
	var soundBtn = new lime.GlossyButton(' ').
		setPosition(0, -btnPosY).setSize(btnWidth, btnHeight).
		setColor('#404040').setOpacity(0.85);
	this.appendChild(soundBtn);
	
	goog.events.listen(soundBtn, ['touchstart', 'mousedown'], function () {
		if (!isMusicPlaying) {
			soundBtnBg.setFill('assets/sound_1.png');
			bgMusic.stop();
			bgMusic.play();
			isMusicPlaying = true;
		} else {
			soundBtnBg.setFill('assets/sound_0.png');
			bgMusic.stop();
			isMusicPlaying = false;
		}
    });

	//initial cpuOverButton values
	var cpuOverState = false;
	
	var cpuOverBtn = new lime.GlossyButton('OC').setSize(btnWidth, btnHeight).
		setPosition(0, btnPosY).setColor('#4359C4');
	this.appendChild(cpuOverBtn);
		
	goog.events.listen(cpuOverBtn, ['touchstart', 'mousedown'], function () {
		if (!cpuOverState) {
			cpuOverState = true;
			cpuOverBtn.setColor('#D71413').setText('!!!');
			// insert overclock mode turned on code here
		} else {
			cpuOverState = false;
			cpuOverBtn.setColor('#4359C4').setText('OC');
			// insert overclock mode turned off code here
		}
	});
};

//define parent class
goog.inherits(gc.SideBar, lime.Sprite);

// new method for bar visibility
gc.SideBar.prototype.updateBar = function () {
	var heightGrowth = (100 - this.cpu.getStatus()) * 10;
	if (heightGrowth <= this.healthBarHeight*2.05) {
		this.mask.setSize(this.healthBarWidth, heightGrowth);
	}
};

/*gc.SideBar.prototype.overclockOnOff = function() {

}*/