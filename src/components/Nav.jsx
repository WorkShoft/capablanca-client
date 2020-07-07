import React from 'react';
import {logout} from "../api/auth.jsx";


const Nav = (props) => {
  const {logged} = props;

  console.log(logged);

  if(logged === true){
    return <nav className="row mx-auto col-lg-12">
             <div className="row col-lg-12 mx-auto">
             <h1 className="mx-auto">Capablanca</h1>
             </div>
             <div className="row col-lg-12 mx-auto">
               <button className="btn mx-auto" onClick={logout}>Log out</button>
             </div>
         </nav>;
  }

  else {
    return <nav className="row mx-auto">           
             <h1 className="text-center col-lg-12">Capablanca</h1>    
    </nav>;
  }
}

export default Nav;
