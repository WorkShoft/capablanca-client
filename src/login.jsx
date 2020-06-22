import React, {useState} from 'react';
import {createAuthProvider} from 'react-token-auth';


const API_URL = 'http://127.0.0.1:8000';
const ACCESS_TOKEN_URL = `${API_URL}/api/token/`;
const REFRESH_TOKEN_URL = `${API_URL}/api/token/refresh/`;

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


export const [useAuth, authFetch, login, logout] =
  createAuthProvider({
    accessTokenKey: 'access',
    onUpdateToken: (token) => fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      body: token.refreshToken
    })
      .then(r => r.json())
  });

export default Login;
