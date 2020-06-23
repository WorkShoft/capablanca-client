import React from 'react';

import transparent from './img/transparent.png'

function Piece(props){
  const {pieceSize} = props;
  const spritesheet = require('./img/chess_brian_provan.png');
  const spritesheetWidth = pieceSize * 6;
  const spritesheetHeight = pieceSize * 12;
  const blue = 'rgb(184, 201, 255)';
  const {pieceType, x, y} = props;

  let backgroundColor = 'white';
  
  let style = {
    backgroundImage: `url(${spritesheet})`,
    backgroundSize: `${spritesheetWidth}px ${spritesheetHeight}px`, 
    backgroundPosition: '0px 0px',
    width: `${pieceSize}px`,
    height: `${pieceSize}px`,
  };
   
  if(y % 2 === 0){
      backgroundColor = x % 2 === 0 ? 'white': blue;
    }

  else {
      backgroundColor = x % 2 === 0 ? blue: 'white';
  }
  
  if(pieceType === ""){          
    return <div style={{width: pieceSize, display: 'inline-block'}}>
             <img src={transparent} style={{width: `${pieceSize}px`, height: `${pieceSize}px`, backgroundColor: backgroundColor}} alt="Transparent background"/>
         </div>;
  }

  else {
    const {pieceColor} = props;
    const pieceOrder = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];    

    const backgroundX = pieceOrder.indexOf(pieceType) * pieceSize;
    const backgroundY = pieceColor === 'white' ? pieceSize : 0;

    let top = 0;
    let left = 0;

    style.backgroundPosition = `-${backgroundX}px -${backgroundY}px`;
        
    return <div style={{width: pieceSize, display: 'inline-block', backgroundColor: backgroundColor}}>
             <img src={transparent} alt="Transparent background" style={{...style, position: 'relative', top: top, left: left, width: `${pieceSize}px`, height: `${pieceSize}px`}} />
           </div>;

  }
}

export default Piece;
