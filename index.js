preload(main);

function main(){
	//set canvas dimensions
	canvas.width = board_size;
	canvas.height = board_size;
	canvas.style.left = `${(window.innerWidth-board_size)/2}px`;
	canvas.style.top = `${(window.innerHeight-board_size)/2}px`;
	canvas.style.position = "absolute";
	//new_board.show_board();
	plot_canvas();
	plot_board();
}

