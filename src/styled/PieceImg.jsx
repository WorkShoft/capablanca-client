import styled from 'styled-components';


const PieceImg = styled.img`
  position: relative; 
  width: ${props => props.pieceSize}px;
  height: ${props => props.pieceSize}px;
  top: ${props => props.top};
  left: ${props => props.left}; 
  background-image: ${props => `url(${props.spritesheet})`};
  background-size: ${props => props.spritesheetWidth}px ${props => props.spritesheetHeight}px;
  background-position: ${props => props.backgroundPosition};
`;


export default PieceImg;
