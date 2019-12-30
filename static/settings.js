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

//instantiate a new board object
var new_board = new ChessBoard();

//list of preloaded images
var images = [];
var images_board_loaded = false

//other variables
var marked_piece = undefined;
animation_image = undefined;

var allowed_moves = [];

//colors
var green = "#46eb34";
//var green = "#4a7d64";
var alpha = 0.6;