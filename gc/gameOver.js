goog.provide('gc.GameOver');

goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Scene');

gc.GameOver = function() {
	lime.Scene.call(this);
	
	var backLayer = new lime.Layer();
	this.appendChild(backLayer);
    
	var text = new lime.Label("Game Over").
		setFontSize("50").setPosition(gc.WIDTH / 2, gc.HEIGHT / 2).
		setFontColor('#fff').setFontWeight('bold');
	backLayer.appendChild(text);
};
goog.inherits(gc.GameOver, lime.Scene);