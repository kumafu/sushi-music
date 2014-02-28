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

	this.ctx;
}

LinkTray.prototype.init = function(_ctx) {
	this.ctx = _ctx;
}

LinkTray.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
	this.ctx.stroke();
}