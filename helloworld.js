//set main namespace
goog.provide('helloworld');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');


// entrypoint
helloworld.start = function(){

	var director = new lime.Director(document.body,1024,768),
	    scene = new lime.Scene(),

	    target1 = new lime.Layer().setPosition(512,384),
		target2 = new lime.Layer().setPosition(5,34),
        circle1 = new lime.Circle().setSize(150,150).setFill(255,150,0),
		circle2 = new lime.Circle().setSize(20,150).setFill(103,150,255),
        lbl1 = new lime.Label().setSize(160,50).setFontSize(30).setText('TOUCH ME!'),
		lbl2 = new lime.Label().setSize(100,50).setFontSize(10).setText('NOOOO'),
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!')
            .setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);


    //add circle and label to target object
    target1.appendChild(circle1);
	target2.appendChild(circle2);
    target1.appendChild(lbl1);
	target2.appendChild(lbl2);

    //add target and title to the scene
    scene.appendChild(target1);
	scene.appendChild(target2);
    scene.appendChild(title);

	director.makeMobileWebAppCapable();

    //add some interaction
    goog.events.listen(target1,['mousedown','touchstart'],function(e){

        //animate
        target1.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target1.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

            title.runAction(new lime.animation.FadeTo(0));
        })
		
	});
	
	//add some interaction
    goog.events.listen(target2,['mousedown','touchstart'],function(e){

        //animate
        target2.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(0.5).setDuration(0.6)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target2.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(5,60)
            ));

            title.runAction(new lime.animation.FadeTo(0));
        });


    });

	// set current scene active
	director.replaceScene(scene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);
