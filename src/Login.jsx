import React, {useState} from 'react';
import {login, API_URL} from './auth.jsx';


const ACCESS_TOKEN_URL = `${API_URL}/api/token/`;

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ({target: {name, value}}) => {
    setCredentials({...credentials, [name]: value});
    };
  
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'      
      },
    })
      .then(r => r.json())
      .then(token => login(token));
  };
  
  return <form onSubmit={onSubmit} className="col-lg-3 mx-auto d-flex justify-content-left card" id="loginMenu">
           <h1 className="text-center text-dark card-header">CHESS</h1><br/>
           <div className="col-lg-12 card-body">
             <div className="label-input">               
	       <label htmlFor="username">Username</label>
	       <input name="username"
                      value={credentials.name}
                      onChange={onChange}
	              className="form-control"
               />
             </div>
             <div className="label-input">
	       <label htmlFor="password">Password</label>
	       <input name="password"
                      type="password"
                      value={credentials.password}             
                      onChange={onChange}
	              className="form-control"
               />

             </div>
               	     <button type="submit" className="col-lg-12 btn btn-primary">Log in</button>
    </div>
  </form>;
};

export default Login;
