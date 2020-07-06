import {API_URL, authFetch} from './auth.jsx';


let GAME_UUID = '';
const createGameEndpoint = '/chess/game/';
const getUnfinishedGamesEndpoint = '/chess/game/get_unfinished_games/'
let getGameEndpoint = `/chess/game/${GAME_UUID}`;

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
  const movePieceEndpoint = `/chess/game/${gameUuid}/move/`;
  return authFetchCall("PUT", movePieceEndpoint, data);
};

const joinGame = (gameUuid, preferredColor) => {
  const joinGameEndpoint = `/chess/game/${gameUuid}/join/`;
  authFetchCall("PUT", joinGameEndpoint, {"preferred_color": preferredColor});
};

const getUnfinishedGames = () => {
  return authFetchCall("GET", getUnfinishedGamesEndpoint);
}

export {createGame, getGame, movePiece, joinGame, getUnfinishedGames};
