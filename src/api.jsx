import {createAuthProvider} from 'react-token-auth';


export const [useAuth, authFetch, login, logout] =
  createAuthProvider<{ accessToken: string, refreshToken: string }>({
    accessTokenKey: 'accessToken',
    onUpdateToken: (token) => fetch('/update-token', {
      method: 'POST',
      body: token.refreshToken
    })
      .then(r => r.json())
  });


const Login = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch('/login', {/**/})
      .then(r => r.json())
      .then(token => login(token));
  };
  
  return <form onSubmit={onSubmit}>
    {/**/}
  </form>
}
