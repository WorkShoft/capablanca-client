import styled from 'styled-components';


const BoardDiv = styled.div`
  boxShadow: 1px 3px 7px 2px black;
  margin: 0 auto;
  marginTop: 5px;
  width: ${props => props.boardSize}px;
`;


export default BoardDiv;
