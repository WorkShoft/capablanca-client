import {API_URL, authFetch} from './auth.jsx';


let GAME_UUID = '';
const createGameEndpoint = '/chess/game/';
const getUnfinishedGamesEndpoint = '/chess/game/get_unfinished_games/'
let getGameEndpoint = `/chess/game/${GAME_UUID}`;
let movePieceEndpoint = `/chess/game/${GAME_UUID}/move/`;
let joinGameEndpoint = `/chess/game/${GAME_UUID}/join/`;


const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};


const authFetchCall = (method, endpoint, data) => {
  const jsonData = JSON.stringify(data);
  
  return authFetch(`${API_URL}${endpoint}`, {
    method: method,
    body: jsonData,
    headers: jsonHeaders,
  })
    .then(r => r.json());
};

/* API calls */ 

const createGame = async (preferredColor) => {
  return authFetchCall("POST", createGameEndpoint, preferredColor);
};

const getGame = (gameUuid) => {
  GAME_UUID = gameUuid;
  return authFetchCall("GET", getGameEndpoint);
};

const movePiece = async (data, gameUuid) => {
  GAME_UUID = gameUuid;
  movePieceEndpoint = `/chess/game/${GAME_UUID}/move/`;
  return authFetchCall("PUT", movePieceEndpoint, data);
};

const joinGame = (gameUuid, preferredColor) => {
  GAME_UUID = gameUuid;
  authFetchCall("POST", joinGameEndpoint, gameUuid, preferredColor);
};

const getUnfinishedGames = () => {
  return authFetchCall("GET", getUnfinishedGamesEndpoint);
}

export {createGame, getGame, movePiece, joinGame, getUnfinishedGames};
