import React, {useState, useEffect} from 'react';
import {getUnfinishedGames} from './api.jsx';


const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGames = async() => {
      setLoading(true);
      const gamesResponse = await getUnfinishedGames();
      setGames(gamesResponse.results);
      setLoading(false);
    };

    loadGames();
  }, []);


  if(loading === false){    
    const gameList = games.map((game) => {
      let {whites_player} = game;
      let {blacks_player} = game;

      let {username: whites_username} = whites_player || "???";
      let {username: blacks_username} = blacks_player || "???";  
      
      return <div>               
               <li>
      <b>{whites_username || "???"}&nbsp;{blacks_username || "???"}</b>
                     </li>
             </div>;
    }
                              );
    return <div className="col-lg-4 mx-auto">
             <th>Whites</th><th>&nbsp;Blacks</th>
             <ul>
               
                 {gameList}
               </ul>
         </div>;
  }

  return <div />;
};

export default GameList;
