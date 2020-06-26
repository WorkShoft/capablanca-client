import React, { useEffect, useState, useRef } from 'react';
import {createGame} from './api.jsx';
import Piece from './Piece.jsx';


function getPieceTypeAndColor(symbol){
  const SYMBOL_MAP = {
    "r": {"pieceType": "rook", "pieceColor": "black"},
    "n": {"pieceType": "knight", "pieceColor": "black"},
    "b": {"pieceType": "bishop", "pieceColor": "black"},
    "q": {"pieceType": "queen", "pieceColor": "black"},
    "k": {"pieceType": "king", "pieceColor": "black"},
    "p": {"pieceType": "pawn", "pieceColor": "black"},
    "R": {"pieceType": "rook", "pieceColor": "white"},
    "N": {"pieceType": "knight", "pieceColor": "white"},
    "B": {"pieceType": "bishop", "pieceColor": "white"},
    "Q": {"pieceType": "queen", "pieceColor": "white"},
    "K": {"pieceType": "king", "pieceColor": "white"},
    "P": {"pieceType": "pawn", "pieceColor": "white"}, 
  };

  return SYMBOL_MAP[symbol];
}

function getSquareFromCoords(x, y){
  /* 
     8 	
     7 (0, 1) -> a7	
     6 	    
     5 	    
     4 	    
     3 	    
     2 	
     1               (7,7) -> h1	
     a b c d e f g h 
   */
  
  const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const file = FILES[x];
  const rank = 8 - y;
  
  return `${file}${rank}`;  
}

function getLayoutFromFen(boardFen){
  /*
     Returns an 8x8 list of lists, where every
     inner list is a board row 
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
          piece = {"pieceType": "", "pieceColor": "", "square": getSquareFromCoords(x, y),"x": x, "y": y};
          layout[y].push(piece);
          x++;
        }
      }
      // If it's not a number, it's a piece symbol
      else {
        const {pieceType, pieceColor} = getPieceTypeAndColor(char);
        piece = {"pieceType": pieceType, "pieceColor": pieceColor, "square": getSquareFromCoords(x, y), "x": x, "y": y};
        layout[y].push(piece);
        x++;
      }
    }
  }

  return layout;
}


function Board(props){
  const [game, setGame] = useState({});
  const [layout, setLayout] = useState({});
  const [fromSquare, setFromSquare] = useState("");
  const [toSquare, setToSquare] = useState("");
  const {whites_player} = game;
  const {blacks_player} = game;
  const {username: whites_username} = whites_player || "???";
  const {username: blacks_username} = blacks_player || "???";
  
  const pieceSize = 36; // width and height in px

  /* Load game asynchronously */
  useEffect(() => {
    const loadGame = async() => {
      const gameData = await createGame();
      setGame(gameData);     
    };

    loadGame();
  }, []);

  /* Load layout after the game data has been loaded */
  useEffect(() => {
    const loadLayout = async() => {
      if(game.hasOwnProperty("board")){
        const boardFen = await game.board.board_fen;
        const layoutData = await getLayoutFromFen(boardFen);
        setLayout(layoutData);
      }      
    };

    loadLayout();
  }, [game]);

  const setFromToSquares = (square) => {
    /* 
      setFromSquare -> setToSquare -> reset and setFromSquare...
    */

    console.log(square);
    console.log(fromSquare === "");
    
    if(fromSquare === ""){
      console.log("fromSquare was unset");
      setFromSquare(square);    
    }

    else if (toSquare === ""){
      console.log("toSquare was unset");
      setToSquare(square);    
    }

    /* Reset */
    else {
      setToSquare("");
      setFromSquare(square);
    }
  };

  const boardStyle = {
    boxShadow: '1px 3px 7px 2px black',
    margin: '0 auto',
    marginTop: '5px',
    width: pieceSize * 8,
  };

  console.log(game);

  let currentLayoutRows = Object.values(layout).map((row) => <div key={row.id} className="board-row" style={{ height: pieceSize }}> {row.map((piece) => <Piece key={piece.id} square={piece.square} pieceSize={pieceSize} pieceType={piece.pieceType} pieceColor={piece.pieceColor} x={piece.x} y={piece.y} setFromToSquares={setFromToSquares} />)}
  </div>);

  return <div>
           <h4 className="text-center">{whites_username || "???"} vs {blacks_username || "???"}</h4><br/>
           <div id="board" style={boardStyle}>             
           {currentLayoutRows}
           </div>;
         </div>;
}

export default Board;
