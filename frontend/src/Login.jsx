import React from 'react';
import userStore from './store.js';
import './login.scss';

export default function Login() {
  const { login, loginError } = userStore();
  return (
    <div>
      {loginError && <div className="errorBox">Wrong Credentials!</div>}
      <div className="loginWrapper">
        <form onSubmit={login}>
          <label htmlFor="userName">Username</label>
          <input required id="userName" type="text"></input>
          <label htmlFor="password">Passwort</label>
          <input required id="password" type="password"></input>
          <input type="submit" value="Einloggen" />
        </form>
      </div>
    </div>
  );
}
