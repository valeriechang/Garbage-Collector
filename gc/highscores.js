goog.provide("gc.Highscores");

goog.require("lime.Scene");
goog.require("lime.RoundedRect");
goog.require("gc.hsTracker");
goog.require("gc.Board");

gc.Highscores = function(){
	lime.Scene.call(this);

	this.hs = new gc.hsTracker();
	this.fontColor = '#fff';

	var backLayer = new lime.Layer();
	this.appendChild(backLayer);

	var board = new gc.Board(this).setWidth(gc.WIDTH).setHeight(gc.HEIGHT);
	backLayer.appendChild(board);

	var hsText = new lime.Label("Highscores").setAlign("center").setFontSize("30").setPosition(0, 10).setWidth(gc.WIDTH);
	backLayer.appendChild(hsText);
}
goog.inherits("gc.Highscores", "lime.Scene");


