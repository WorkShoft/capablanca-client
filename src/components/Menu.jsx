import React from 'react';
import {
  Link
} from "react-router-dom";
import {logout} from "../api/auth.jsx";

function Menu(props){
  return (
    <div className="menu mx-auto text-center">           
      <div className="buttonList col-lg-2 mx-auto">
        <Link to="/game">
          <button className="col-lg-12" id="newGame">New game</button>
        </Link>
	<Link to="/gamelist">
          <button className="col-lg-12" id="joinGame">Join game</button>
        </Link>
      </div>
    </div>          
  );
}

export default Menu;

  

