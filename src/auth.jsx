import {createAuthProvider} from 'react-token-auth';

export const API_URL = 'http://127.0.0.1:8000';
const REFRESH_TOKEN_URL = `${API_URL}/api/token/refresh/`;


const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};


export const [useAuth, authFetch, login, logout] =
  createAuthProvider({
    accessTokenKey: 'access',
    onUpdateToken: (token) => fetch(REFRESH_TOKEN_URL, {      
      method: 'POST',
      body: JSON.stringify({refresh: token.refresh}),
      headers: jsonHeaders,
    })
      .then(r => r.json())
      .then((r) => {
	return {
	  "refresh": token.refresh,
	  "access": r.access
	};
      }
           )
  });


