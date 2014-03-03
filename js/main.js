var rail;

$(function() {
	$('#start-button').click(function(){
		if (rail.stat == 0){
			$(this).text("Stop");
			rail.start();
		}
		else{
			$(this).text("Start");
			rail.stop();
		}
	});

	$('button.dish-button').click(function(){
		var link = rail.getSetLink();
		var id = $(this).val();
		link.dish = {id: id, color: setting.dishcolor[id]};
	});

	$('#reset-button').click(function(){
		rail.resetDish();
	});

	$('#speed-input').change(function(){
		rail.setParam();
	});

	init();
});

function init(){
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');

	rail = new Rail();
	rail.init(ctx);
}

var setting = {
	'dishcolor' : [
		'#ccc',
		'#fcc',
		'#cfc',
		'#ccf',
		'#ffc',
		'#fcf'
	]
}
