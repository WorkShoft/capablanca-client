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
    console.log(e);

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
  
  return <form onSubmit={onSubmit}>
           <label htmlFor="user">User</label><br/>
           <input name="username"
                  value={credentials.name}
                  onChange={onChange}/><br/><br/>
           <label htmlFor="password">Password</label><br/>
           <input name="password"
                  type="password"
                  value={credentials.password}             
                  onChange={onChange}/><br/><br/>
           <button type="submit">Submit</button>
         </form>;
};

export default Login;
