import React, { useEffect, useState, setState } from 'react';
import {createGame, getGame, movePiece, joinGame} from './api.jsx';
import Piece from './Piece.jsx';


function getPieceTypeAndColor(symbol){
  const BLACK_PIECES = ["r", "n", "b", "q", "k", "p"];
  const WHITE_PIECES = ["R", "N", "B", "Q", "K", "P"];
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
          piece = {"pieceType": "", "pieceColor": "", "x": x, "y": y};
          layout[y].push(piece);
          x++;
        }
      }
      // If it's not a number, it's a piece symbol
      else {
        const {pieceType, pieceColor} = getPieceTypeAndColor(char);
        piece = {"pieceType": pieceType, "pieceColor": pieceColor, "x": x, "y": y};
        layout[y].push(piece);
        x++;
      }
    }
  }

  return layout;
}


function Board(props){
  const [game, setGame] = useState({});
  const pieceSize = 32; // width and height in px

  useEffect(() => {
    const loadGame = async() => {
      const gameData = await createGame();
      setGame(gameData);
    };

    loadGame();
  }, []);

  useEffect(() => {
    if(game.hasOwnProperty("board")){
      const boardFen = game.board.board_fen;      
    }
  }
           );

  const boardStyle = {
    boxShadow: '1px 3px 7px 2px black',
    margin: '0 auto',
    marginTop: '5px',
    border: '1px solid #3c415e',
    width: pieceSize * 8,
    height: pieceSize * 8
  };


  let {layout} = props;
  let currentLayoutRows = layout.map((row, y) => <div className="board-row" style={{ height: pieceSize }}> {row.map((piece, x) => <Piece pieceSize={pieceSize} pieceType={piece.pieceType} pieceColor={piece.pieceColor} x={x} y={y}/>)}</div>);

  return <div id="board" style={boardStyle}>{currentLayoutRows}</div>; 
}

export default Board;
