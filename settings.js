//global game settings
var piece_theme='merida'
var board_theme='blue'
var board_size = 0.75*Math.min(window.innerWidth,window.innerHeight);
var tile_size = board_size/8;
var flip = false
var canvas =  document.querySelector('canvas');
var c =  canvas.getContext('2d');

//instantiate a new board object
var new_board = new ChessBoard();

//list of preloaded images
var images = [];
var images_board_loaded = false