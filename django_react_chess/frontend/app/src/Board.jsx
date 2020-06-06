import React from 'react';
import Piece from './Piece.jsx';

function Board(props){
  const pieceSize = 32; // width and height in px
  
  let {layout} = props;
  let currentLayoutRows = layout.map((row, y) => <div className="board-row" style={{ height: pieceSize }}> {row.map((piece, x) => <Piece pieceSize={pieceSize} pieceType={piece.pieceType} pieceColor={piece.pieceColor} x={x} y={y}/>)}</div>);

  return <div id="board">{currentLayoutRows}</div>; 

}

export default Board;
