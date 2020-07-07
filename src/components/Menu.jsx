import React from 'react';
import {
  Link
} from "react-router-dom";
import {logout} from "../api/auth.jsx";

function Menu(props){
  return (
    <div className="menu mx-auto text-center">           
      <div className="buttonList col-lg-1 mx-auto">
        <Link to="/game">
          <button className="col-lg-12 text-left">Create game</button>
        </Link>
	<Link to="/gamelist">
          <button className="col-lg-12 text-left">Join game</button>
        </Link>
        <button className="col-lg-12 text-left" onClick={logout}>Log out</button>
      </div>
    </div>          
  );
}

export default Menu;

  

