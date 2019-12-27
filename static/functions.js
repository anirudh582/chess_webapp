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
	return coord[0]>=0 && coord[1]>=0 && coord[1]<=7 && coord[1]<=7;
}

function null_piece(coord){
	return new_board.board[coord[1]][coord[0]].id=="-";
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
	m.fillStyle = "#46eb34";
	m.globalAlpha = 0.4;
	m.fillRect(coord[0]*tile_size,coord[1]*tile_size,tile_size,tile_size);
}

function generate_animation(init_coord,final_coord,callback) {

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


function accept_move(init_coord, final_coord) {
	draw_transparent_green_tile(final_coord);
	piece = new_board.board[init_coord[1]][init_coord[0]];
	new_board.board[init_coord[1]][init_coord[0]] = new Null();
	new_board.board[final_coord[1]][final_coord[0]] = create_piece(piece.id,piece.alliance,final_coord);
	animation_img = images[piece.alliance+piece.id];
	generate_animation(init_coord,final_coord,plot_board);
}

function mouse_click() {
	let mouse_pos = get_mouse_pos();
	let coord = [Math.floor(mouse_pos.x/tile_size),Math.floor(mouse_pos.y/tile_size)];
	if(!null_piece(coord) && marked_piece==undefined) {
		m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
		draw_transparent_green_tile(coord);
		marked_piece = new_board.board[coord[1]][coord[0]];
	}
	else if (marked_piece!=undefined) {
		if(coord[0]==marked_piece.coord[0] && coord[1] == marked_piece.coord[1]) {
			m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
		}
		else {
			// draw_transparent_green_tile(coord);
			// new_board.board[marked_piece.coord[1]][marked_piece.coord[0]] = new Null(marked_piece.coord);
			// new_board.board[coord[1]][coord[0]] = create_piece(marked_piece.id,marked_piece.alliance,coord);
			// animation_img = images[marked_piece.alliance+marked_piece.id];
			// generate_animation(marked_piece.coord,coord,plot_board);
			accept_move(marked_piece.coord,coord);
			socket.emit('move', {init_coord:marked_piece.coord, final_coord:coord});
		}
		marked_piece = undefined;
	}
}

function receive_move(move) {
	draw_transparent_green_tile(move.init_coord);
	accept_move(move.init_coord,move.final_coord);
}
