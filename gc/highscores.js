goog.provide("gc.Highscores");

goog.require("lime.Scene");
goog.require("lime.RoundedRect");
goog.require("gc.hsTracker");
//goog.require("gc.Board");

gc.Highscores = function(){
	lime.Scene.call(this);

	this.hs = new gc.hsTracker();
	this.fontColor = '#fff';

	var backLayer = new lime.Layer();
	this.appendChild(backLayer);

	var board = new lime.RoundedRect().setFill(0, 100, 0).setSize(gc.WIDTH, gc.HEIGHT).setPosition(gc.WIDTH / 2, gc.HEIGHT / 2);
	backLayer.appendChild(board);

	var hsText = new lime.Label("Highscores").setAlign("center").setFontSize("30").setPosition(gc.WIDTH / 2, 20).setFontColor('#fff');
	backLayer.appendChild(hsText);


	var hs = new gc.hsTracker();
	hs.start();
	var i;
	for(i = 0; i < 7; i++){
		var obj = hs.next();
		if(!obj){
			break;
		}
		var name = new lime.Label(obj.name).setAlign("center").setFontSize("20").setPosition(gc.WIDTH / 2 - 100, 60 + i * 30).setFontColor('#fff');
		var score = new lime.Label(obj.points).setAlign("center").setFontSize("20").setPosition(gc.WIDTH / 2 + 100, 60 + i * 30).setFontColor('#fff');
		backLayer.appendChild(name);
		backLayer.appendChild(score);
	}

	var backBtn = gc.makeMenuBtn("Main Menu");
	backBtn.setPosition(gc.WIDTH / 2, 70 + i * 30);
	goog.events.listen(backBtn, ['touchstart', 'mousedown'], function() {
		gc.loadMenu();
	});
	backLayer.appendChild(backBtn);

}
goog.inherits(gc.Highscores, lime.Scene);


