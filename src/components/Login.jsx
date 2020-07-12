import React, {useState} from 'react';

import "../css/Login.css";
import {login, API_URL} from '../api/auth.jsx';


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
  
  return <div>
    <form onSubmit={onSubmit} className="mx-auto d-flex justify-content-left card col-lg-2" id="loginMenu">
      <div className="col-lg-12 card-body text-center">
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
    </form>  
  </div>};


export default Login;
