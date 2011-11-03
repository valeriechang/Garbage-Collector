goog.provide('gc.Player');

goog.require('lime.Sprite');

gc.Player = function(game){
	lime.Sprite.call(this);
	
	this.game = game;
	//this.setAnchorPoint(0, 0);
	this.setFill('assets/grim_stationary1.png');
	this.setSize(100,100);
}	
goog.inherits(gc.Player, lime.Sprite);

gc.Player.prototype.enableInteraction = function() {
    var py = this.getPosition().y;
    goog.events.listen(this, ['mousedown', 'touchstart'], function(e) {
        var whalf = this.getSize().width / 2;
        var width = this.getParent().getSize().width - whalf;
        var py = this.getPosition().y;
        e.startDrag(false, new goog.math.Box(py, width, py, whalf));
    },false, this);
};
