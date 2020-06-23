import {createAuthProvider} from 'react-token-auth';

export const API_URL = 'http://127.0.0.1:8000';
const REFRESH_TOKEN_URL = `${API_URL}/api/token/refresh/`;

export const [useAuth, authFetch, login, logout] =
  createAuthProvider({
    accessTokenKey: 'access',
    onUpdateToken: (token) => fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      body: token.refreshToken
    })
      .then(r => r.json())
  });
