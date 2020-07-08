import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer, toast} from 'react-toastify';
import {getGame, createGame, movePiece} from '../api/api.jsx';
import {getLayoutFromFen} from '../utils/utils.jsx';

import Piece from './Piece.jsx';
import BoardDiv from '../styled/board_styled.jsx';


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
  const boardSize = pieceSize * 8;

  const notify = (detail) => toast(detail);

  const {uuid} = props.match.params;
  
  /* Load game asynchronously */
  useEffect(() => {    
    const loadGame = async() => {
      let gameData = {};
      
      if(uuid !== undefined){
	gameData = await getGame(uuid);
      }

      else {
	gameData = await createGame({"preferred_color": "white"});
      }
      
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

  /* Request a move */
  useEffect(() => {
    if (fromSquare !== "" && toSquare !== "") {
      const moveData = {
        from_square: fromSquare,
        to_square: toSquare
      };
      
      const callMovePiece = async() => {
        const response = await movePiece(moveData, game.uuid);

	if(response.board){
          const boardFen = await response.board.board_fen;
          const layoutData = await getLayoutFromFen(boardFen);
	  setLayout(layoutData);        
	}

	else if(response.detail){
	  notify(response.detail);
	}
      };

      callMovePiece();
      setToSquare("");
      setFromSquare("");
    };
  }, [game.uuid, fromSquare, toSquare]);

  const setFromToSquares = (square) => {
    /* setFromSquare -> setToSquare -> reset -> setFromSquare */
    
    if(fromSquare === ""){
      setFromSquare(square);    
    }

    else if (toSquare === ""){
      setToSquare(square);
    }         
  };

  let currentLayoutRows = Object.values(layout).map((row) =>
                                                    <div key={row.id} className="board-row" style={{ height: pieceSize }}>
                                                      {row.map((piece) =>
	                                                       <Piece key={piece.id} square={piece.square} pieceSize={pieceSize} pieceType={piece.pieceType}
	                                                              pieceColor={piece.pieceColor} x={piece.x} y={piece.y} setFromToSquares={setFromToSquares}
	                                                       />
                                                              )
                                                      }
                                                    </div>
                                                   );
  
  return <div>
    <ToastContainer />
    <h4 className="text-center">{whites_username || "???"} vs {blacks_username || "???"}</h4><br/>   
    <BoardDiv id="board" boardSize={boardSize}>             
      {currentLayoutRows}
    </BoardDiv>;
  
  </div>;
}

export default Board;
