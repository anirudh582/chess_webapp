function preload(callback) {
	var count = 0;

	function onload(){
		count++;
		if(count==12) {
			callback();
		}
	}

	images.board = new Image()
	images.board.src = "./chessArt/board/" + board_theme + ".png"
	images.board.onload = function(){onload();}
	images.bB = new Image()
	images.bB.src = "./chessArt/piece/" + piece_theme +"/"+ "bB.svg"
	images.bB.onload = function(){onload();}
	images.bK = new Image()
	images.bK.src = "./chessArt/piece/" + piece_theme +"/"+ "bK.svg"
	images.bK.onload = function(){onload();}
	images.bN = new Image()
	images.bN.src = "./chessArt/piece/" + piece_theme +"/"+ "bN.svg"
	images.bN.onload = function(){onload();}
	images.bP = new Image()
	images.bP.src = "./chessArt/piece/" + piece_theme +"/"+ "bP.svg"
	images.bP.onload = function(){onload();}
	images.bQ = new Image()
	images.bQ.src = "./chessArt/piece/" + piece_theme +"/"+ "bQ.svg"
	images.bQ.onload = function(){onload();}
	images.bR = new Image()
	images.bR.src = "./chessArt/piece/" + piece_theme +"/"+ "bR.svg"
	images.bR.onload = function(){onload();}
	images.wB = new Image()
	images.wB.src = "./chessArt/piece/" + piece_theme +"/"+ "wB.svg"
	images.wB.onload = function(){onload();}
	images.wK = new Image()
	images.wK.src = "./chessArt/piece/" + piece_theme +"/"+ "wK.svg"
	images.wK.onload = function(){onload();}
	images.wN = new Image()
	images.wN.src = "./chessArt/piece/" + piece_theme +"/"+ "wN.svg"
	images.wN.onload = function(){onload();}
	images.wP = new Image()
	images.wP.src = "./chessArt/piece/" + piece_theme +"/"+ "wP.svg"
	images.wP.onload = function(){onload();}
	images.wQ = new Image()
	images.wQ.src = "./chessArt/piece/" + piece_theme +"/"+ "wQ.svg"
	images.wQ.onload = function(){onload();}
	images.wR = new Image()
	images.wR.src = "./chessArt/piece/" + piece_theme +"/"+ "wR.svg"
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

function clear_rect(canvas) {
	if(drawn_rect[0]>=0) 
		canvas.clearRect(drawn_rect[0]*tile_size,drawn_rect[1]*tile_size,tile_size,tile_size);
}

function mouse_click() {
	let mouse_pos = get_mouse_pos();
	let coord = [Math.floor(mouse_pos.x/tile_size),Math.floor(mouse_pos.y/tile_size)];
	if(!null_piece(coord) && marked_piece==undefined) {
		m.clearRect(0,0,mark_canvas.width,mark_canvas.height);
		m.fillStyle = "#46eb34";
		m.globalAlpha = 0.4;
		m.fillRect(coord[0]*tile_size,coord[1]*tile_size,tile_size,tile_size);
		drawn_rect = coord;
	}
	else {

	}
}