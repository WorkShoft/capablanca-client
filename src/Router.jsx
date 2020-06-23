import React from 'react';
import Board from './Board.jsx';
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
	             <Route exact path="/" render={() =>
                                                   <div>
                                                     <button onClick={logout}>Logout</button><br/>
                                                     <Board layout={layout} />
                                                   </div>}/>
                     <Redirect to="/"/>
                   </>
        }
      </Switch>
    </Router>
  );
}

export default AppRouter;
