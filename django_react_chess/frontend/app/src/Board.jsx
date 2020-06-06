import React from 'react';
import Piece from './Piece.jsx';


function Board(props){
  const pieceSize = 32; // width and height in px

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
