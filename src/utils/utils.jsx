import SYMBOL_MAP from './constants.jsx';


const getPieceTypeAndColor = (symbol) => {
  return SYMBOL_MAP[symbol];
}


const getSquareFromCoords = (x, y, flipped = false) => {
  /* 
     8 	
     7 (0,1) -> a7	
     .
     .
     .
     1       
     a . . . h (7,7) -> h1	 
   */

  
  const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const rank = flipped ? (y + 1) : (8 - y);
  const file = flipped ? FILES[7 - x] : FILES[x];
  
  return `${file}${rank}`;  
}


const getLayoutFromFen = (boardFen, flipped = false) => {
  /*
     Takes a fen string.
     Returns an 8x8 list of lists, where every
     inner list is a board row.
   */

  const board_fen_split = boardFen.split("/");
  let layout = [];

  for (const [y, row] of board_fen_split.entries()){
    let x = 0;
    layout.push([]);
    const row_symbols = row.split("");
    for(const char of row_symbols){
      let piece = "";
      // Check if the symbol is a number
      if (!isNaN(char)){
        for(let i=0; i<char; i++){
          piece = {"pieceType": "", "pieceColor": "", "square": getSquareFromCoords(x, y, flipped), "x": x, "y": y};
          layout[y].push(piece);
          x++;
        }
      }
      // If it's not a number, it's a piece symbol
      else {
        const {pieceType, pieceColor} = getPieceTypeAndColor(char);
        piece = {"pieceType": pieceType, "pieceColor": pieceColor, "square": getSquareFromCoords(x, y, flipped), "x": x, "y": y};
        layout[y].push(piece);
        x++;
      }
    }
  }

  return layout;
}


export {getLayoutFromFen};
