/**
 * LinkTray class
 *
 * @constructor
 */

function LinkTray() {
	//settings
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.localTime = 0;
	this.size = 10;

	this.dish = null;

	this.ctx;
}

LinkTray.prototype.init = function(_ctx) {
	this.ctx = _ctx;
}

LinkTray.prototype.draw = function() {
	this.ctx.save();
	if (this.dish == null){
		this.ctx.fillStyle = 'rgb(128, 128, 128)';
	}
	else{
		this.ctx.fillStyle = this.dish.color;
	}
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
	this.ctx.fill();
	this.ctx.restore();
}
