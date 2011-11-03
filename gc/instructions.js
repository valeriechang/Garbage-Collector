goog.provide('gc.Instructions');

goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('rb.Button');

gc.Instructions = function() {
	lime.Scene.call(this);
	
	var btn = new rb.Button('Back').setPosition(360, 870).setSize(300, 90);
    goog.events.listen(btn, 'click', function() {rb.loadMenu()});
    this.appendChild(btn);
    
    var contents = new lime.RoundedRect().setRadius(30).setFill('#fff').setSize(700, 560).setPosition(360, 420);
    this.appendChild(contents);
    
    var txt1 = new lime.Label().setFontSize(18).setSize(280, 100).setPosition(-160, -170).setAlign('left');
    txt1.setText('Click somewhere on the screen to move there');
    contents.appendChild(txt1);
};
goog.inherits(gc.Instructions, lime.Scene);
