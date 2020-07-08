import React from 'react';
import PieceImg from './../styled/PieceImg.jsx';

import transparent from '../img/transparent.png';

function Piece(props){
  const {pieceSize} = props;
  const spritesheet = require('../img/chess_brian_provan.png');
  const spritesheetWidth = pieceSize * 6;
  const spritesheetHeight = pieceSize * 12;
  const blue = 'rgb(184, 201, 255)';
  const {pieceColor, pieceType, square, x, y, setFromToSquares} = props;
  
  let backgroundColor = 'white';  

  if ( (x + y) % 2 !== 0){      
    backgroundColor = blue;
  }
  
  if(pieceType === ""){          
    return <div style={{display: "inline-block"}} className="board-square-container">
      
             <button square={square} className="board-square" onClick={() => setFromToSquares(square)} style={{position: "relative", width: `${pieceSize}px`, height: `${pieceSize}px`, backgroundColor: backgroundColor}}>
               <img alt=""/>
      </button>

    </div>;    
  }

  else {
    const pieceOrder = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];    
    const backgroundX = pieceOrder.indexOf(pieceType) * pieceSize;
    const backgroundY = pieceColor === 'white' ? pieceSize : 0;

    let top = 0;
    let left = 0;
    let backgroundPosition = `-${backgroundX}px -${backgroundY}px`;
    
    return <div style={{height: pieceSize, display: 'inline-block', backgroundColor: backgroundColor}}>
      <button square={square} className="board-square" onClick={() => setFromToSquares(square)}>
	<PieceImg alt="Chess piece" src={transparent} top={top} left={left} pieceSize={pieceSize} spritesheet={spritesheet} spritesheetWidth={spritesheetWidth} spritesheetHeight={spritesheetHeight} backgroundPosition={backgroundPosition}> 
	</PieceImg>
      </button>
    </div>;
  }
}

export default Piece;
