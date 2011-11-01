goog.provide('gc.button');

goog.require('lime.GlossyButton');

gc.button = function(txt){
	lime.GlossyButton(txt, this);
	
	this.borderWidth = 4;
	this.setColor('#500');
}
