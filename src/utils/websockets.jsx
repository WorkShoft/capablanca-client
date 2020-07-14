const WEBSOCKET_HOST = "127.0.0.1:8000";

const gameSocket = (gameUuid, gameSetter) => {
  /* 
    gameUuid: 
      UUID of the chess game
    gameSetter: 
      State Hook setter, for instance 'setGame'.
      this setter will be used to set a new game state
      when it is updated.
   */

  const socketPath = `ws://${WEBSOCKET_HOST}/ws/game/${gameUuid}/`;
  const socket = new WebSocket(socketPath);

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    gameSetter(data);
  };

  socket.onclose = (e) => {
    console.error('Chat socket closed');
  };

  return socket;
};

export {gameSocket};
