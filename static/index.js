window.onload = function(){
	preload(main);
}


function main(){

	flip = (player_alliance=='w') ? false:true;
	console.log(flip);
	new_board = new ChessBoard();
	new_board.update_all_attacked_squares();
	console.log(new_board.attacked_squares);
	piece_canvas.addEventListener('click',mouse_click);

	//set canvas dimensions
	set_canvas_dimensions();

	plot_canvas();
	plot_board();

	

	

}

