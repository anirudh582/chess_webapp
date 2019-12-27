//global game settings
var piece_theme='merida'
var board_theme='blue'
var board_size = Math.min(window.innerWidth,window.innerHeight);
var tile_size = board_size/8;
var flip = false
var board_canvas = document.getElementById('board');
var mark_canvas = document.getElementById('marks');
var animation_canvas = document.getElementById('animations');
var piece_canvas = document.getElementById('pieces');
var b =  board_canvas.getContext('2d');
var m =  mark_canvas.getContext('2d');
var a =  animation_canvas.getContext('2d');
var p =  piece_canvas.getContext('2d');


//socket
var socket = io();

socket.on('connect', function() {
	socket.send('User has connected!');
});


//instantiate a new board object
var new_board = new ChessBoard();

//list of preloaded images
var images = [];
var images_board_loaded = false

var marked_piece = undefined;
animation_image = undefined;