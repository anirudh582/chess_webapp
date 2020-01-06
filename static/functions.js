function preload(callback) {
	var count = 0;

	function onload(){
		count++;
		if(count==13) {
			callback();
		}
	}

	images.board = new Image()
	images.board.src = "/static/images/board/" + board_theme + ".png"
	images.board.onload = function(){onload();}
	images.bB = new Image()
	images.bB.src = "/static/images/piece/" + piece_theme +"/"+ "bB.svg"
	images.bB.onload = function(){onload();}
	images.bK = new Image()
	images.bK.src = "/static/images/piece/" + piece_theme +"/"+ "bK.svg"
	images.bK.onload = function(){onload();}
	images.bN = new Image()
	images.bN.src = "/static/images/piece/" + piece_theme +"/"+ "bN.svg"
	images.bN.onload = function(){onload();}
	images.bP = new Image()
	images.bP.src = "/static/images/piece/" + piece_theme +"/"+ "bP.svg"
	images.bP.onload = function(){onload();}
	images.bQ = new Image()
	images.bQ.src = "/static/images/piece/" + piece_theme +"/"+ "bQ.svg"
	images.bQ.onload = function(){onload();}
	images.bR = new Image()
	images.bR.src = "/static/images/piece/" + piece_theme +"/"+ "bR.svg"
	images.bR.onload = function(){onload();}
	images.wB = new Image()
	images.wB.src = "/static/images/piece/" + piece_theme +"/"+ "wB.svg"
	images.wB.onload = function(){onload();}
	images.wK = new Image()
	images.wK.src = "/static/images/piece/" + piece_theme +"/"+ "wK.svg"
	images.wK.onload = function(){onload();}
	images.wN = new Image()
	images.wN.src = "/static/images/piece/" + piece_theme +"/"+ "wN.svg"
	images.wN.onload = function(){onload();}
	images.wP = new Image()
	images.wP.src = "/static/images/piece/" + piece_theme +"/"+ "wP.svg"
	images.wP.onload = function(){onload();}
	images.wQ = new Image()
	images.wQ.src = "/static/images/piece/" + piece_theme +"/"+ "wQ.svg"
	images.wQ.onload = function(){onload();}
	images.wR = new Image()
	images.wR.src = "/static/images/piece/" + piece_theme +"/"+ "wR.svg"
	images.wR.onload = function(){onload();}
}

function set_canvas_dimensions() {
	var canvas = document.getElementsByClassName("canvas");
	for(let i=0;i<canvas.length;i++) {
		canvas[i].width = board_size;
		canvas[i].height = board_size;
		canvas[i].style.left = `${(window.innerWidth-board_size)/2}px`;
		canvas[i].style.top = `${(window.innerHeight-board_size)/2}px`;
		canvas[i].style.position = "absolute";
	}

}

function plot_canvas() {
	b.drawImage(images.board,0,0,board_size,board_size);
}


function plot_board(){
	p.clearRect(0,0,piece_canvas.width,piece_canvas.height);
	let xpos=0;
	let ypos=0;
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			if(new_board.board[i][j].id!="-") {
				img = images[new_board.board[i][j].alliance+new_board.board[i][j].id];
				if (!flip) {
					p.drawImage(img,xpos,ypos,tile_size,tile_size);
				}
				else{
					p.drawImage(img,xpos,board_size-tile_size-ypos,tile_size,tile_size);
				}
			}
			xpos+=tile_size;
		}
		xpos=0;
		ypos+=tile_size;
	}
}

function get_mouse_pos(){
	let rect = board_canvas.getBoundingClientRect();
	return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
}

function coord_inside_board(coord) {
	return coord[0]>=0 && coord[1]>=0 && coord[0]<=7 && coord[1]<=7;
}

function null_piece(coord){
	return new_board.board[coord[1]][coord[0]].id=="-";
}

function self_piece(coord,alliance) {
	if(new_board.board[coord[1]][coord[0]].id!="-")
		return new_board.board[coord[1]][coord[0]].alliance == alliance;
}

function enemy_piece(coord,alliance) {
	if(new_board.board[coord[1]][coord[0]].id!="-")
		return new_board.board[coord[1]][coord[0]].alliance != alliance;
}

function create_piece(piece_id,alliance,coord){
	let new_piece = undefined;
	switch(piece_id) {
		case 'R':
			new_piece = new Rook(alliance,coord);
			break;
		case 'N':
			new_piece = new Knight(alliance,coord);
			break;
		case 'B':
			new_piece = new Bishop(alliance,coord);
			break;
		case 'Q':
			new_piece = new Queen(alliance,coord);
			break;
		case 'K':
			new_piece = new King(alliance,coord);
			break;
		case 'P':
			new_piece = new Pawn(alliance,coord);
			break;
		default:
			console.log("Error, invalid piece. Cannot creat piece")

	}
	return new_piece;

}

function draw_transparent_green_tile(coord) {
	m.fillStyle = green;
	m.globalAlpha = alpha;
	m.rect(coord[0]*tile_size,coord[1]*tile_size,tile_size,tile_size);
	m.closePath();
}

function draw_green_circle(coord){
	m.fillStyle = green;
	m.globalAlpha = alpha;
	m.arc(coord[0]*tile_size+tile_size/2,coord[1]*tile_size+tile_size/2,0.15*tile_size,2*Math.PI,false);
	m.closePath();
}

function draw_red_circle(coord){
	m.fillStyle = "#ff0000";
	m.globalAlpha = alpha;
	m.arc(coord[0]*tile_size+tile_size/2,coord[1]*tile_size+tile_size/2,0.15*tile_size,2*Math.PI,false);
	m.closePath();
}

function draw_attack_mark(coord){
	m.fillStyle = green;
	m.globalAlpha = alpha;
	m.rect(coord[0]*tile_size,coord[1]*tile_size,tile_size,tile_size);
	m.arc(coord[0]*tile_size+tile_size/2,coord[1]*tile_size+tile_size/2,tile_size/2,2*Math.PI,false);
	m.closePath();
}

function generate_animation(init_coord,final_coord,callback) {

	if(flip){
		init_coord = [init_coord[0],7-init_coord[1]];
		final_coord = [final_coord[0], 7-final_coord[1]];
	}

	function exit(){
		a.clearRect(0, 0, animation_canvas.width, animation_canvas.height);
		callback();
	}
	let x=init_coord[0]*tile_size;
	let y=init_coord[1]*tile_size;
	let x1=final_coord[0]*tile_size;
	let y1=final_coord[1]*tile_size;

	let slope = (y1-y)/(x1-x);
	incr = (y1!=y) ? (y1-y)*(Math.abs((y1-y)/tile_size))/(Math.abs(y1-y)*0.1) : (x1-x)*(Math.abs((x1-x)/tile_size))/(Math.abs(x1-x)*0.1);
	animate();
	function animate() {
	  a.clearRect(0, 0, animation_canvas.width, animation_canvas.height);  
	  a.drawImage(animation_img, x, y,tile_size,tile_size);  
	  if(y1!=y){                    
		y += incr;
		x += incr/slope;
		if (y1>y)
			if ( y1-y > incr ) requestAnimationFrame(animate);
			else exit();
		else if(y1<y)
		  	if ( y1-y < incr ) requestAnimationFrame(animate);
			else exit();
	  }
	  else {
		x += incr;
		y += incr*slope;
		if (x1>x)
			if ( x1-x > incr ) requestAnimationFrame(animate);
			else exit();
		else if(x1<x)
			if ( x1-x < incr ) requestAnimationFrame(animate);
			else exit();
	  }
	}
}

function mark_allowed_moves(allowed_moves,piece) {
	filtered_moves = allowed_moves; //filter later by king check
	for(let i=0; i<filtered_moves.length; i++){
		if(flip){
			if(null_piece(filtered_moves[i]))
				draw_green_circle([filtered_moves[i][0],7-filtered_moves[i][1]]);
			else if (enemy_piece(filtered_moves[i],piece.alliance))
				draw_attack_mark([filtered_moves[i][0],7-filtered_moves[i][1]]);
		}
		else {
			if(null_piece(filtered_moves[i]))
				draw_green_circle(filtered_moves[i]);
			else if (enemy_piece(filtered_moves[i],piece.alliance))
				draw_attack_mark(filtered_moves[i]);
		}
	}
}

function accept_move(init_coord, final_coord, receiving) {
	let mark_init_coord = [];
	let mark_final_coord = [];
	if(flip && receiving){
		mark_init_coord = [7-init_coord[0],7-init_coord[1]];
		mark_final_coord = [7-final_coord[0],7-final_coord[1]];
		init_coord = [7-init_coord[0],init_coord[1]];
		final_coord = [7-final_coord[0],final_coord[1]];
	}
	draw_transparent_green_tile(mark_init_coord);
	draw_transparent_green_tile(mark_final_coord);
	piece = new_board.board[init_coord[1]][init_coord[0]];
	new_board.board[init_coord[1]][init_coord[0]] = new Null();
	new_board.board[final_coord[1]][final_coord[0]] = create_piece(piece.id,piece.alliance,final_coord);
	//if(!qeeuning_up){
	if(piece.id == 'K'){
		new_board.update_king_position(final_coord,piece.alliance);
		//move_rook_if_castling
	}
	if(piece.id=='R' || piece.id=='K')
		new_board.board[final_coord[1]][final_coord[0]].set_moved();
	//}

	//else
		//queen/knight/bishop/rook based on user input;

	new_board.update_all_attacked_squares();
	animation_img = images[piece.alliance+piece.id];
	generate_animation(init_coord,final_coord,plot_board);
	turn = (turn=='w') ? 'b':'w';
}

function coord_in_array(coord,allowed_moves){
	for(let i=0; i<allowed_moves.length;i++)
		if(allowed_moves[i][0]==coord[0] && allowed_moves[i][1]==coord[1])
			return true;
	return false;
}

function mouse_click() {
	let mouse_pos = get_mouse_pos();
	let coord = [Math.floor(mouse_pos.x/tile_size),Math.floor(mouse_pos.y/tile_size)];
	if(flip)
		coord = [coord[0],7-coord[1]];
	if(!null_piece(coord) && marked_piece==undefined && turn==player_alliance) {
		m.beginPath();
		m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
		draw_transparent_green_tile(coord);
		marked_piece = new_board.board[coord[1]][coord[0]];
		marked_piece.get_allowed_moves();
		mark_allowed_moves(allowed_moves,marked_piece);
		m.fill("evenodd");
	}
	else if (marked_piece!=undefined) {
		if (coord_in_array(coord,allowed_moves)) {
			m.beginPath();
			m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
			accept_move(marked_piece.coord,coord,false);
			if(flip)
				socket.emit('move', {init_coord:[7-marked_piece.coord[0],marked_piece.coord[1]], final_coord:[7-coord[0],coord[1]]});
			else
				socket.emit('move', {init_coord:marked_piece.coord, final_coord:coord});
			m.fill();
		}
		else {
			m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
		}
		marked_piece = undefined;
	}
}

function receive_move(move) {
	accept_move(move.init_coord,move.final_coord,true);
	m.fill();
}



