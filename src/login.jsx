import {React} from 'react';
import {createAuthProvider} from 'react-token-auth';

const API_URL = '127.0.0.1:8000'
const ACCESS_TOKEN_URL = `${API_URL}/api/token/`
const REFRESH_TOKEN_URL = `${API_URL}/api/token/refresh/`


export const [useAuth, authFetch, login, logout] =
  createAuthProvider<{ accessToken: string, refreshToken: string }>({
    accessTokenKey: 'access',
    onUpdateToken: (token) => fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      body: token.refreshToken
    })
      .then(r => r.json())
  });


const Login = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(ACCESS_TOKEN_URL, {})
      .then(r => r.json())
      .then(token => login(token));
  };
  
  return <form onSubmit={onSubmit}>
    <label for="user">User</label>
    <input name="user"></input>
    <label for="password">Password</label>
    <input name="password"></input>
    <button type="submit">Submit</button>
  </form>
}


export default Login;
