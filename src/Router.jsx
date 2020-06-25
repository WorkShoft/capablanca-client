import React from 'react';
import Board from './Board.jsx';
import Menu from './Menu.jsx';
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
	  
	  <Route exact path="/game" render={() =>
                                            <div>
                                              <button onClick={logout}>Logout</button><br/>
                                              <Board layout={layout} />
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
