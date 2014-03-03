/**
 * Rail class
 *
 * @constructor
 */

function Rail() {
	this.linkNum = 0;
	this.linkList = [];
	this.curTime = 0;

	this.preTime;
	this.timer;
	this.stat = 0;

	this.totalDist = 0;
	this.width = 640;
	this.height = 440;
	this.offsetX = 80;
	this.offsetY = 80;

	this.setPos = 0.05;
	this.sensorPos = 0.25;
	this.speed = 300;

	this.ctx;
}


Rail.prototype.init = function(_ctx) {
	this.ctx = _ctx;
	this.ctx.strokeRect(this.offsetX,this.offsetY,this.width,this.height);
	this.totalDist = this.width * 2 + this.height * 2;

	this.setParam();

	for (var i = this.linkNum - 1; i > -1; --i){
		var link = new LinkTray();
		link.init(this.ctx);
		this.linkList.push(link);
		link.num = i;
	}
}
Rail.prototype.setParam = function() {
	this.linkNum = parseInt($("#linknum-input").val());
	this.speed = parseInt($("#speed-input").val());
}

Rail.prototype.start = function() {
	var self = this;
	this.timer = setInterval(function(){self.loop()}, 20);
	this.stat = 1;
	this.preTime = new Date().getTime();
}

Rail.prototype.stop = function() {
	clearInterval(this.timer);
	this.stat = 0;
}

Rail.prototype.loop = function() {
	this.ctx.clearRect(0, 0, 800, 600);
	this.ctx.strokeRect(this.offsetX,this.offsetY,this.width,this.height);
	var now = parseInt(new Date().getTime());
	this.curTime += (now - this.preTime);
	$("#time-input").val(this.curTime);

	var timeOffset = this.curTime / this.speed;
	for (var i = this.linkNum - 1; i > -1;--i){
		var link = this.linkList[i];
		link.localTime = ((timeOffset + parseInt(i)) % this.linkNum) / this.linkNum;
		this.calcLinkPos(link);
		link.draw();
	}
	var sensoredID = parseInt(this.linkNum + timeOffset - this.sensorPos * this.linkNum) % this.linkNum;

	this.getSensor(this.linkList[this.linkNum - sensoredID - 1]);

	this.ctx.strokeRect(this.offsetX + this.totalDist * this.setPos, this.offsetY - 20, 5, 40);
	this.ctx.strokeRect(this.offsetX + this.totalDist * this.sensorPos, this.offsetY - 20, 5, 40);

	this.preTime = now;
}

Rail.prototype.getSetLink = function(){
	var timeOffset = this.curTime / this.speed;
	var i = this.linkNum - 1 - parseInt((this.linkNum + timeOffset - this.setPos * this.linkNum) % this.linkNum);
	return this.linkList[i];
}

Rail.prototype.getSensor = function(link){
	if (link.dish == null) return;

	if (link.dish.id == 0){
		if (link.sensored){
			console.log("X : " + link.num + " / " + this.curTime / this.speed + " / null");
			$.ajax({
				type: "GET",
				url: 'del'+link.num+"-null.js"
			});
		}
		link.dish = null;
		link.sensored = false;
	}
	else if (link.dish.id != 0 && !link.sensored){
		console.log("O : " + link.num + " / " + this.curTime / this.speed + " / " + link.dish.id);
		$.ajax({
			type: "GET",
			url: 'osc'+link.num+"-"+link.dish.id + ".js"
		});
		link.sensored = true;
	}
}

Rail.prototype.resetDish = function(){
	for (var i in this.linkList){
		if (this.linkList[i].dish != null){
			this.linkList[i].dish = {id:0, color: setting.dishcolor[0]};
		}
	}
}

Rail.prototype.calcLinkPos = function(_link) {
	var time = _link.localTime;
	var pos = time * this.totalDist;
	if (pos < this.width){
		_link.x = this.offsetX + pos;
		_link.y = this.offsetY;
	}
	else if (pos < this.width + this.height){
		_link.x = this.offsetX + this.width;
		_link.y = this.offsetY + pos - this.width;
	}
	else if (pos < this.width * 2 + this.height){
		_link.x = this.offsetX + this.width - (pos - this.height - this.width);
		_link.y = this.offsetY + this.height;
	}
	else if (pos < this.width * 2 + this.height * 2){
		_link.x = this.offsetX;
		_link.y = this.offsetY + this.height - (pos - this.width * 2 - this.height);
	}
}