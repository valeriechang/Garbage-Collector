goog.provide("gc.hsTracker");

gc.hsTracker = function(){
	this.data = window.localStorage.getItem("highscores");
	this.index = 0;
	if(!this.data){
		this.data = [];
	}
	else{
		this.data = JSON.parse(this.data);
	}
}

gc.hsTracker.prototype.addStore = function(name, points){
		this.data[] = {'name': name, 'points': points};
		this.sort();
		this.save();
}

gc.hsTracker.prototype.start = function(){
	this.index = 0;
}

gc.hsTracker.prototype.end = function(){
	this.index = this.data.length - 1;
}

gc.hsTracker.prototype.next = function(){
	var obj = null;
	if(this.index < this.data.length){
		obj = {'name': this.data[this.index].name, 
		       'points': this.data[this.index].points};
		this.index++;
	}
	return obj;
}

gc.hsTracker.prototype.sort = function(){
	var sorter = function(a, b){
		return a.points - b.points;
	};
	this.data.sort(sorter);
}

gc.hsTracker.prototype.save = function(){
	window.localStorage.setItem("highscores", JSON.stringify(this.data));
}
