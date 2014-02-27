var rail;

$(function() {
	$('#start-button').click(function(){
		$(this).text("Stop");
	});

	init();
});

function init(){
	rail = new Rail();
}

