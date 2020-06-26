import React from 'react';

import transparent from './img/transparent.png';

function Piece(props){
  const {pieceSize} = props;
  const spritesheet = require('./img/chess_brian_provan.png');
  const spritesheetWidth = pieceSize * 6;
  const spritesheetHeight = pieceSize * 12;
  const blue = 'rgb(184, 201, 255)';
  const {pieceColor, pieceType, square, x, y, setFromToSquares} = props;
  
  let backgroundColor = 'white';  
  let style = {
    backgroundImage: `url(${spritesheet})`,
    backgroundSize: `${spritesheetWidth}px ${spritesheetHeight}px`, 
    backgroundPosition: '0px 0px',
    width: `${pieceSize}px`,
    height: `${pieceSize}px`,
  };

  if ( (x + y) % 2 !== 0){      
    backgroundColor = blue;
  }
  
  if(pieceType === ""){          
    return <div style={{display: "inline-block"}} class="board-square-container">
      <button square={square} className="board-square" onClick={() => setFromToSquares(square)} style={{position: "relative", width: `${pieceSize}px`, height: `${pieceSize}px`, backgroundColor: backgroundColor}}>
      </button>
    </div>;    
  }

  else {
    const pieceOrder = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];    

    const backgroundX = pieceOrder.indexOf(pieceType) * pieceSize;
    const backgroundY = pieceColor === 'white' ? pieceSize : 0;

    let top = 0;
    let left = 0;

    style.backgroundPosition = `-${backgroundX}px -${backgroundY}px`;
    
    return <div style={{height: pieceSize, display: 'inline-block', backgroundColor: backgroundColor}}>
      <button square={square} className="board-square" onFocus={() => setFromToSquares(square)}>
	<img src={transparent} alt="Transparent background" style={{...style, position: 'relative', top: top, left: left, width: `${pieceSize}px`, height: `${pieceSize}px`}} />
      </button>
    </div>;
  }
}

export default Piece;
