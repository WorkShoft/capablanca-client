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

import Login from './Login.jsx';
import {useAuth, logout} from './auth.jsx';


function AppRouter(props){
  const [logged] = useAuth();
  const {layout} = props;
  
  return (
    <Router>
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
							 <button onClick={logout}>Logout</button>
                                                         <Board layout={layout} {...routeProps}/>
                                                       </div>
                                                      }
                     />
                     <Route exact path="/gamelist" render={() => <div>
                                                       <button onClick={logout}>Logout</button><br/>
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
