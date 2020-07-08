import styled from 'styled-components';


const BoardDiv = styled.div`
  box-shadow: 1px 3px 7px 2px black;
  margin: 0 auto;
  width: ${props => props.boardSize}px;
`;


export default BoardDiv;
