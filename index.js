let canvas =  document.querySelector('canvas');
let board_size = 0.75*Math.min(window.innerWidth,window.innerHeight);
canvas.width = board_size;
canvas.height = board_size;
canvas.style.left = `${0.1*window.innerWidth}px`;
canvas.style.top = `${0.1*window.innerHeight}px`;
canvas.style.position = "absolute";


let c =  canvas.getContext('2d');

let img = new Image();
img.src = "./chessArt/board/blue.png";
img.onload = function() {
	c.drawImage(img,0,0,board_size,board_size);
}

let wn = new Image();
wn.src = "./ChessArt/piece/merida/wN.svg";
let tile_size = board_size/8;
pos_x = 2
pos_y = 7
wn.onload = function () {
	c.drawImage(wn,pos_x*tile_size,pos_y*tile_size,tile_size,tile_size);
}