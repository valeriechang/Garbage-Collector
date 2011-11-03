goog.provide('gc.Instructions');

goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Scene');
goog.require('lime.Sprite');


gc.Instructions = function() {
	lime.Scene.call(this);
	
	var backLayer = new lime.Layer();
	this.appendChild(backLayer);

	var board = new lime.RoundedRect().setFill(0, 100, 0).setSize(gc.WIDTH, gc.HEIGHT).setPosition(gc.WIDTH / 2, gc.HEIGHT / 2);
	backLayer.appendChild(board);

	
	var backBtn = gc.makeMenuBtn("Back");
	backBtn.setPosition(gc.WIDTH / 2, 70 + 2 * 30);
	goog.events.listen(backBtn, 'click', function() {
		gc.prevScene();
	});
	backLayer.appendChild(backBtn);
    
    
	var text = new lime.Label("Instructions").setAlign("center").setFontSize("30").setPosition(gc.WIDTH / 2, 20).setFontColor('#fff');
	backLayer.appendChild(text);
	
	var text2 = new lime.Label().setFontSize(18).setSize(280, 100).setPosition(gc.WIDTH / 2, 20).setAlign('center');
	text2.setText("click to move and attack!");
	backLayer.appendChild(text2);
};
goog.inherits(gc.Instructions, lime.Scene);
