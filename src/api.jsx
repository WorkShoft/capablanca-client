import {API_URL, authFetch} from './auth.jsx';


let GAME_UUID = '';
const createGameEndpoint = '/chess/game/';
const getGameEndpoint = `/chess/game/?uuid=${GAME_UUID}`;
const movePieceEndpoint = '/chess/game/board/move/';
const joinGameEndpoint = '/chess/game/join/';


const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};


const authFetchCall = (method, endpoint, ...parameters) => {
  return authFetch(`${API_URL}${endpoint}`, {
      method: method,
      body: JSON.stringify(...parameters),
      headers: jsonHeaders,
  })
    .then(r => r.json())
};

/* API calls */ 

const createGame = async (preferredColor) => {
  return authFetchCall("POST", createGameEndpoint, preferredColor);
}

const getGame = (gameUuid) => {
  GAME_UUID = gameUuid;
  return authFetchCall("GET", getGameEndpoint);
};
const movePiece = (gameUuid, fromSquare, toSquare) => authFetchCall("POST", movePieceEndpoint, gameUuid, fromSquare, toSquare);
const joinGame = (gameUuid, preferredColor) => authFetchCall("POST", joinGameEndpoint, gameUuid, preferredColor);

export {createGame, getGame, movePiece, joinGame};
