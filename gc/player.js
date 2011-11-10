goog.provide('gc.Player');

goog.require('lime.Sprite');

gc.Player = function(){
	lime.Sprite.call(this);
}
goog.inherits(gc.Player, lime.Sprite);
