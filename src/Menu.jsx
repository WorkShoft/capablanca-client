import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import {logout} from "./auth.jsx";

function Menu(props){
  return (
            <div className="menu mx-auto">           
              <div className="buttonList col-lg-3 mx-auto">
                <Link to="/game">
          <button className="col-lg-12 text-left">Create game</button>
                </Link>
                <button className="col-lg-12 text-left">Join game</button>
                <button className="col-lg-12 text-left" onClick={logout}>Log out</button>
              </div>
            </div>          
         );
}

export default Menu;

  

