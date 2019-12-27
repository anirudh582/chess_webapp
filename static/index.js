preload(main);

function main(){

	//socket
	socket.on('connect', function() {
		socket.send('User has connected!');
	});

	socket.on('move', function (move) {
		receive_move(move);
	});

	//set canvas dimensions
	set_canvas_dimensions();

	plot_canvas();
	plot_board();

	piece_canvas.addEventListener('click',mouse_click);

}

