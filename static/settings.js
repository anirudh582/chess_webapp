//global game settings
var piece_theme='merida'
var board_theme='blue'
var board_size = Math.min(window.innerWidth,window.innerHeight);
var tile_size = board_size/8;
var flip = false;
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
	//socket.send('User has connected!');
	socket.emit('message','User has connected!');
});

socket.on('alliance', function(alliance){
	console.log('alliance received');
	player_alliance = alliance;
	console.log(player_alliance);
});

socket.on('move', function (move) {
	receive_move(move);
});

//global new_board variable
var new_board = undefined;


//list of preloaded images
var images = [];
var images_board_loaded = false

//other variables
var marked_piece = undefined;
animation_image = undefined;

var allowed_moves = [];
var turn = 'w';
var player_alliance = undefined;

//colors
var green = "#46eb34";
//var green = "#4a7d64";
var alpha = 0.4;

//game end
var checkmate = false;