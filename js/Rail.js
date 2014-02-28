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

	this.ctx;
}


Rail.prototype.init = function(_ctx) {
	this.ctx = _ctx;
	this.ctx.strokeRect(this.offsetX,this.offsetY,this.width,this.height);
	this.totalDist = this.width * 2 + this.height * 2;

	// this.ctx.beginPath();
	// this.ctx.arc(70, 70, 60, 0, Math.PI*2, false);
	// this.ctx.stroke();
	this.linkNum = parseInt($("#linknum-input").val());

	for (var i = 0; i < this.linkNum; ++i){
		var link = new LinkTray();
		link.init(this.ctx);
		this.linkList.push(link);
	}
}

Rail.prototype.start = function() {
	var self = this;
	this.timer = setInterval(function(){self.loop()}, 50);
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

	for (var i in this.linkList){
		var link = this.linkList[i];
		var timeOffset = this.curTime / 10;
		link.localTime = ((timeOffset + parseInt(i)) % this.linkNum) / this.linkNum;
		this.calcLinkPos(link);
		link.draw();
	}

	this.preTime = now;
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