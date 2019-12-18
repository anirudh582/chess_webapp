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

function plot_canvas() {
	c.drawImage(images.board,0,0,board_size,board_size);
}


function plot_board(){
	let xpos=0;
	let ypos=0;
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			if(new_board.board[i][j].id!="-") {
				img = images[new_board.board[i][j].alliance+new_board.board[i][j].id];
				if (!flip) {
					c.drawImage(img,xpos,ypos,tile_size,tile_size);
				}
				else{
					c.drawImage(img,xpos,board_size-tile_size-ypos,tile_size,tile_size);
				}
			}
			xpos+=tile_size;
		}
		xpos=0;
		ypos+=tile_size;
	}
}