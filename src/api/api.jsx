import {API_URL, authFetch} from './auth.jsx';


const PAYLOAD_METHODS = ["POST", "PUT", "PATCH"];

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const authFetchCall = (method, endpoint, data) => {
  let HTTP_REQUEST_CONFIG = {
    method: method,
    headers: jsonHeaders
  };
    
  if(PAYLOAD_METHODS.includes(method)){
    const jsonData = JSON.stringify(data);      
    HTTP_REQUEST_CONFIG.body = jsonData;
  }
  
  return authFetch(
    `${API_URL}${endpoint}`,
    HTTP_REQUEST_CONFIG
  )
    .then(r => r.json())
    .catch(error => console.log(`Error! Payload: ${HTTP_REQUEST_CONFIG.body}\n Response: ${r => r}`, error)); 
};

/* API calls */ 

const createGame = async (preferredColor) => {
  const createGameEndpoint = '/chess/game/';
  return authFetchCall("POST", createGameEndpoint, preferredColor);
};

const getGame = (gameUuid) => {
  const getGameEndpoint = `/chess/game/${gameUuid}/`;
  return authFetchCall("GET", getGameEndpoint);
};

const movePiece = async (data, gameUuid) => {
  const movePieceEndpoint = `/chess/game/${gameUuid}/move/`;
  return authFetchCall("PUT", movePieceEndpoint, data);
};

const joinGame = async (gameUuid, preferredColor) => {
  const joinGameEndpoint = `/chess/game/${gameUuid}/join/`;
  return authFetchCall("PUT", joinGameEndpoint, preferredColor);
};

const getUnfinishedGames = () => {
  const getUnfinishedGamesEndpoint = '/chess/game/get_unfinished_games/';
  return authFetchCall("GET", getUnfinishedGamesEndpoint);
}

export {createGame, getGame, movePiece, joinGame, getUnfinishedGames};
