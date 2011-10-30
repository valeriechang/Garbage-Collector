//set main namespace
goog.provide('gc');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.GlossyButton');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

gc.WIDTH = 320;
gc.HEIGHT = 460;
// entrypoint
gc.start = function(){

	gc.director = new lime.Director(document.body,gc.WIDTH,gc.HEIGHT);
	gc.director.makeMobileWebAppCapable();

    gc.loadMenu();
 

}

gc.loadMenu = function(){

	var scene = new lime.Scene(),
	  layer = new lime.Layer().setPosition(gc.WIDTH / 2, gc.HEIGHT/2);

	if(gc.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);


	var title = new lime.Sprite().setFill('assets/grimreaper.png').setPosition(0, 0);
	title.qualityRenderer = true;
	layer.appendChild(title);
	 
	var startBtn = new lime.GlossyButton("Start").setColor('#300').setSize(150,45).setPosition(0, 0);
	
	layer.appendChild(startBtn);
	 
	scene.appendChild(layer);
	
	// Set current scene active
	gc.director.replaceScene(scene, lime.transitions.Dissolve);	
}

gc.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('gc.start', gc.start);

