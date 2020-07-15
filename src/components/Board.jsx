import React, {useEffect, useState} from 'react';

import 'react-toastify/dist/ReactToastify.css';
import '../css/Board.css';

import {ToastContainer, toast} from 'react-toastify';
import {getGame, createGame, joinGame, movePiece} from '../api/api.jsx';
import {getLayoutFromFen} from '../utils/utils.jsx';

import Piece from './Piece.jsx';
import BoardDiv from '../styled/BoardDiv.jsx';
import ResultModal from './ResultModal.jsx';
import Spinner from './Spinner.jsx';

import {gameSocket} from '../utils/websockets.jsx';


function Board(props){
  const pieceSize = 36; // width and height in px
  const boardSize = pieceSize * 8;
  
  const [game, setGame] = useState({});
  const [layout, setLayout] = useState({});
  const [fromSquare, setFromSquare] = useState("");
  const [toSquare, setToSquare] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [usernameClasses, setUsernameClasses] = useState(
    {
      "whiteUsernameClass": "text-normal",
      "blackUsernameClass": "text-normal"
    }
  );
  const [whitesUsername, setWhitesUsername] = useState("");
  const [blacksUsername, setBlacksUsername] = useState("");  
  const authUsername = JSON.parse(window.localStorage.getItem("REACT_TOKEN_AUTH_KEY")).name;

  const [socket, setSocket] = useState({});
  const {uuid} = props.match.params;
  const notify = (detail) => toast(detail);

  
  /* Load game asynchronously */
  useEffect(() => {    
    const loadGame = async() => {
      let gameData = {};
      
      if(uuid !== undefined){
        await joinGame(uuid, {"preferred_color": "random"});
        gameData = await getGame(uuid);
      }

      else {
	gameData = await createGame({"preferred_color": "white"});
      }
      
      setGame(gameData);
      const socketObj = gameSocket(gameData.uuid, setGame);
      setSocket(socketObj);
    };

    loadGame();
  }, []);

  
  useEffect(() => {
    const {username: whitesUsername} = game.whites_player || "???";
    const {username: blacksUsername} = game.blacks_player || "???";  

    setWhitesUsername(whitesUsername);
    setBlacksUsername(blacksUsername);    
  }, [game, uuid]);

  
  /* Load layout after the game data has been loaded */
  useEffect(() => {
    const loadLayout = async() => {
      if(game.hasOwnProperty("board")){
	const flipped = authUsername === blacksUsername;

	const boardFen = flipped ? game.board.board_fen_flipped : game.board.board_fen;	
        const layoutData = await getLayoutFromFen(boardFen, flipped);
        setLayout(layoutData);       
      }

      if(game.hasOwnProperty("result")){
        const result = await game.result;

        setResult(result);
        
        if(result.result === "White wins"){
          setUsernameClasses({
            "whiteUsernameClass": "text-success",
            "blackUsernameClass": "text-danger"
          });
        }

        else if(result.result === "Black wins"){
          setUsernameClasses({
            "whiteUsernameClass": "text-danger",
            "blackUsernameClass": "text-success"
          });
        }
      }      
    };

    loadLayout();
    
    setLoading(false);
  }, [game, whitesUsername, blacksUsername, authUsername]);

  /* Request a move */
  useEffect(() => {
    if (fromSquare !== "" && toSquare !== "") {
      const moveData = {
        from_square: fromSquare,
        to_square: toSquare
      };
      
      const callMovePiece = async() => {
        const response = await movePiece(moveData, game.uuid);

	if(response.result){
	  socket.send(JSON.stringify({"update": true}));
	}

	else if(response.detail){
	  notify(response.detail);
	}
      };

      callMovePiece();
      setToSquare("");
      setFromSquare("");
    };
  }, [game.uuid, fromSquare, toSquare, socket]);

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

  const blackIcon = <h6 className="text-left mx-auto userIcon" style={{ width: boardSize }}>
                      <img alt="Black player" className="userImg" src="https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_960_720.png"/>
                      <span className={usernameClasses.blackUsernameClass}> {blacksUsername || "???"}</span> 
                    </h6>;

  const whiteIcon = <h6 className="text-left mx-auto userIcon" style={{ width: boardSize }}>
                      <img alt="White player" className="userImg" src="https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_960_720.png"/>
                      <span className={usernameClasses.whiteUsernameClass}> {whitesUsername || "???"}</span>
                    </h6>;

  const infoButton = <div className="text-center">
                       <button data-toggle="modal" data-target="#resultModal" className="infoButton btn-secondary text-right" style={{ width: boardSize }}>
                         <img alt="Game information icon" id="gameInfoIcon" src="https://cdn.pixabay.com/photo/2016/03/31/19/13/information-1294813_960_720.png"/>
                       </button>
                     </div>;

  return <div uuid={game.uuid} id="mainDiv">
                   <ToastContainer />
                   <ResultModal id="resultModal" result={result} />           
                   {(authUsername === whitesUsername && blackIcon) || whiteIcon}
                   <br/>
                   <div>
                     {
	               (loading === true &&
	                <Spinner color={"#123abc"} size={boardSize} />
	               )
	                 ||

	               <BoardDiv id="board" boardSize={boardSize}>
	                 {currentLayoutRows}
	               </BoardDiv>
                     }

                   </div>
                   <br/>	 	 
                   {(authUsername === whitesUsername && whiteIcon) || blackIcon}
                   {infoButton}
                 </div>;
}

export default Board;
