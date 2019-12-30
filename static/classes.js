class Bishop {
	constructor(alliance,coord) {
		this.id = 'B';
		this.alliance = alliance;
		this.coord = coord;
	}
}

class King {
	constructor(alliance,coord) {
		this.id = 'K';
		this.alliance = alliance;
		this.coord = coord;
	}
}

class Knight {
	constructor(alliance,coord) {
		this.id = 'N';
		this.alliance = alliance;
		this.coord = coord;
	}

	allowed_moves() {
		allowed_moves = [];
		let temp = [];
		temp.push([this.coord[0]+2,this.coord[1]+1]);
        temp.push([this.coord[0]+2,this.coord[1]-1]);
        temp.push([this.coord[0]-2,this.coord[1]+1]);
        temp.push([this.coord[0]-2,this.coord[1]-1]);
        temp.push([this.coord[0]+1,this.coord[1]+2]);
        temp.push([this.coord[0]+1,this.coord[1]-2]);
        temp.push([this.coord[0]-1,this.coord[1]+2]);
        temp.push([this.coord[0]-1,this.coord[1]-2]);
        for(let i=0;i<temp.length;i++) {
        	if(coord_inside_board(temp[i]) && !self_piece(temp[i],this.alliance))
        		allowed_moves.push(temp[i]);
        }
	}
}

class Null {
	constructor(coord) {
		this.id = '-';
		this.coord = coord;
	}
}

class Pawn {
	constructor(alliance,coord) {
		this.id = 'P';
		this.alliance = alliance;
		this.coord = coord;
	}
}

class Queen {
	constructor(alliance,coord) {
		this.id = 'Q';
		this.alliance = alliance;
		this.coord = coord;
	}
}

class Rook {
	constructor(alliance,coord) {
		this.id = 'R';
		this.alliance = alliance;
		this.coord = coord;
	}
}

class ChessBoard {
	constructor() {
		this.board = [[new Rook('b',[0,0]), new Knight('b',[1,0]), new Bishop('b',[2,0]), new Queen('b',[3,0]), new King('b',[4,0]), new Bishop('b',[5,0]), new Knight('b',[6,0]), new Rook('b',[7,0])],
					  [new Pawn('b',[0,1]), new Pawn('b',[1,1]), new Pawn('b',[2,1]), new Pawn('b',[3,1]), new Pawn('b',[4,1]), new Pawn('b',[5,1]), new Pawn('b',[6,1]), new Pawn('b',[7,1])],
					  [new Null([0,2]), new Null([1,2]), new Null([2,2]), new Null([3,2]), new Null([4,2]), new Null([5,2]), new Null([6,2]), new Null([7,2])],
					  [new Null([0,3]), new Null([1,3]), new Null([2,3]), new Null([3,3]), new Null([4,3]), new Null([5,3]), new Null([6,3]), new Null([7,3])],
					  [new Null([0,4]), new Null([1,4]), new Null([2,4]), new Null([3,4]), new Null([4,4]), new Null([5,4]), new Null([6,4]), new Null([7,4])],
					  [new Null([0,5]), new Null([1,5]), new Null([2,5]), new Null([3,5]), new Null([4,5]), new Null([5,5]), new Null([6,5]), new Null([7,5])],
					  [new Pawn('w',[0,6]), new Pawn('w',[1,6]), new Pawn('w',[2,6]), new Pawn('w',[3,6]), new Pawn('w',[4,6]), new Pawn('w',[5,6]), new Pawn('w',[6,6]), new Pawn('w',[7,6])],
					  [new Rook('w',[0,7]), new Knight('w',[1,7]), new Bishop('w',[2,7]), new Queen('w',[3,7]), new King('w',[4,7]), new Bishop('w',[5,7]), new Knight('w',[6,7]), new Rook('w',[7,7])]];
	}

	show_board() {
		let board = ''
		for(let i=0;i<8;i++) {
			for(let j=0;j<8;j++){
				if(this.board[i][j].id != "-") {
					board += this.board[i][j].alliance + this.board[i][j].id + "|";
				}
				else
					board+="--" + "|";
			}
			board+="\n";
		}
		console.log(board);
	}
}
