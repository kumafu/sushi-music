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
		link.dish = {color: setting.dishcolor[id]};
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
		'#fcc',
		'#cfc',
		'#ccf',
		'#ffc',
		'#fcf'
	]
}
