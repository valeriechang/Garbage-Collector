//set main namespace
goog.provide('gc');



goog.addDependency("../../../gc/highscores.js", ['gc.Highscores'], ['lime.Scene', 'lime.RoundedRect', 'gc.hsTracker', 'lime.Layer', 'lime.Label']);
goog.addDependency("../../../gc/hsTracker.js", ['gc.hsTracker'], []);
goog.addDependency("../../../gc/instructions.js", ['gc.Instructions'], ['lime.Scene', 'lime.RoundedRect', 'lime.Layer', 'lime.Label', 'lime.Sprite']);

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
goog.require('gc.Button');
goog.require('gc.Game');
goog.require('gc.Highscores');
goog.require('lime.audio.Audio');
goog.require('lime.Sprite');
goog.require('gc.Instructions');

gc.WIDTH = 500;
gc.HEIGHT = 320;

// entrypoint
gc.start = function(){

	gc.director = new lime.Director(document.body,gc.WIDTH,gc.HEIGHT);
	gc.director.makeMobileWebAppCapable();

    gc.loadMenu();
}

gc.loadMenu = function(){
	var btnSound = new lime.audio.Audio('assets/Sounds/dundun.mp3');
	
	var scene = new lime.Scene(),
	  layer = new lime.Layer().setPosition(gc.WIDTH / 2, gc.HEIGHT/2);

	if(gc.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);

	var background = new lime.Sprite().setFill('assets/grimreaper.png').setPosition(0, 100);
	background.qualityRenderer = true;
	layer.appendChild(background);
	
	// Creat button, set its position, and listen for a click event to play a sound
	var startBtn = gc.makeMenuBtn("Start").setPosition(0,0);
	goog.events.listen(startBtn, 'click', function() {
		btnSound.stop();
		btnSound.play();
		
		gc.newGame();
	});
	layer.appendChild(startBtn);
	
	// Creat button, set its position, and listen for a click event to play a sound 
	var instrBtn = gc.makeMenuBtn("Instructions").setPosition(0, 50);
	goog.events.listen(instrBtn, 'click', function() {
		btnSound.stop();
		btnSound.play();
		gc.showInstructions();
	});
	layer.appendChild(instrBtn);

	// Creat button, set its position, and listen for a click event to play a sound 
	var highBtn = gc.makeMenuBtn("High Scores").setPosition(0, 100);
	goog.events.listen(highBtn, 'click', function() {
		btnSound.stop();
		btnSound.play();
		gc.showHighscores();
	});
	layer.appendChild(highBtn);
	
	scene.appendChild(layer);
	
	// Set current scene active
	gc.director.replaceScene(scene, lime.transitions.Dissolve);	
}

gc.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

gc.makeMenuBtn = function(txt){
	var btn = new gc.Button(txt).setSize(150,45).setFontColor('#fff');
	return btn;
}

gc.prevScene = function(){
	gc.director.popScene();
}

gc.showHighscores = function(){
	var scene = new gc.Highscores();
	gc.director.pushScene(scene);
}

gc.showInstructions = function(){
	var scene = new gc.Instructions();
	gc.director.pushScene(scene);
}

gc.newGame = function(){
	var game = new gc.Game();
	gc.director.replaceScene(game, lime.transitions.Dissolve);
	game.start();
}
//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('gc.start', gc.start);

