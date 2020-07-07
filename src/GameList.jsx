import React, {useState, useEffect} from 'react';
import {
  Link
} from "react-router-dom";
import {getUnfinishedGames, joinGame} from './api.jsx';


const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const loadGames = async() => {
    setLoading(true);
    const gamesResponse = await getUnfinishedGames();
    setGames(gamesResponse.results);
    setLoading(false);
    };
    
    loadGames();
  }, [joining]);

  const gameList = games.map((game) => {
    let {whites_player} = game;
    let {blacks_player} = game;
    let {uuid} = game;

    let {username: whites_username} = whites_player || "???";
    let {username: blacks_username} = blacks_player || "???";  

    return         <Link to={`/game/${uuid}`}>
                     <tr className="row" key={game.id} onClick={async () => {
	setJoining(true);
	await joinGame(uuid, "random");
	setJoining(false);
      }}>

	<td className="col-lg-6 col-sm-6 col-6">
	  <b>{whites_username || "???"}</b>
	</td>
	<td className="col-lg-6 col-sm-6 col-6">
	  <b>{blacks_username || "???"}</b>
	</td>
                     </tr>
                   </Link>;
  });

  if(loading === false && joining === false) {
    return <table className="col-lg-2 col-sm-6 col-9 table mx-auto text-center" id="gameList">
             <thead>
               <tr className="row">
                 <th className="col-lg-6 col-6"><b>Whites</b></th>
                 <th className="col-lg-6 col-6"><b>Blacks</b></th>
               </tr>
             </thead>
             <tbody>
               {gameList}
             </tbody>
           </table>;    
  }

  return <div />;

};


export default GameList;
