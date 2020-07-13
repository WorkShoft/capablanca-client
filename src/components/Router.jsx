import React from 'react';
import Board from './Board.jsx';
import Menu from './Menu.jsx';
import GameList from './GameList.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Nav from './Nav.jsx';
import Login from './Login.jsx';
import {useAuth} from "../api/auth.jsx";


function AppRouter(props){
  const [logged] = useAuth();
  const {layout} = props;
  
  return (
    <Router>
      <Nav logged={logged} />
      <Switch>
	{!logged && <>
	              <Route path="/login" component={Login}/>
                      <Redirect to="/login"/>
	            </>}
        {logged && <>
                     <Redirect to="/menu"/>
                     <Route exact path="/menu" component={Menu} />	  
	             <Route exact path="/game/:uuid?" render={routeProps =>
                                                              <div>
                                                                <Board layout={layout} {...routeProps} />
                                                              </div>
                                                             }
                     />
                     <Route exact path="/my_games" render={() => <div>
                                                                         <GameList ownGames={true} />
                                                                       </div>
                                                          }
                     />
	             <Route exact path="/all_games" render={() => <div>
         <GameList />
       </div>
          }
          />
        </>	
        }
      </Switch>
    </Router>
  );
}

export default AppRouter;
