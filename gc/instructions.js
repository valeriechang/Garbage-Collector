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

	
	var backBtn = gc.makeMenuBtn("Main Menu");
	backBtn.setPosition(gc.WIDTH / 2, 275);
	goog.events.listen(backBtn, 'click', function() {
		gc.loadMenu();
	});
	backLayer.appendChild(backBtn);
    
    
	var text = new lime.Label("Instructions").setAlign("center").setFontSize("30").setPosition(gc.WIDTH / 2, 20).setFontColor('#fff');
	backLayer.appendChild(text);
	
	var objective = new lime.Label().setFontSize("18").setPosition(gc.WIDTH / 2, 75).setAlign('center').setFontColor('#fff');
	objective.setText("Your CPU is being attacked by zombie children!");
	backLayer.appendChild(objective);
	
	var objective2 = new lime.Label().setFontSize("18").setPosition(gc.WIDTH / 2, 100).setAlign('center').setFontColor('#fff');
	objective2.setText("Defeat them before it crashes!");
	backLayer.appendChild(objective2);
	
	var text2 = new lime.Label().setFontSize("18").setPosition(gc.WIDTH / 2, 150).setAlign('center').setFontColor('#fff');
	text2.setText("Click/Tap to move, you'll attack all enemies in your path.");
	backLayer.appendChild(text2);
	
	var clock = new lime.Label().setFontSize("18").setPosition(gc.WIDTH / 2, 200).setAlign('center').setFontColor('#fff');
	clock.setText("Click/Tap the button on the lower left corner to overclock!");
	backLayer.appendChild(clock);
	
	var clock2 = new lime.Label().setFontSize("18").setPosition(gc.WIDTH / 2, 225).setAlign('center').setFontColor('#fff');
	clock2.setText("Be warned, it can make your CPU overheat!");
	backLayer.appendChild(clock2);
};
goog.inherits(gc.Instructions, lime.Scene);
