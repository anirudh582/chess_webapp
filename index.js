preload(main);

function main(){
	//set canvas dimensions
	set_canvas_dimensions();

	plot_canvas();
	plot_board();

	piece_canvas.addEventListener('click',mouse_click);
}

