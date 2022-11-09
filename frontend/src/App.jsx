import './App.scss';
import React from 'react';
import Login from './login';
import BasePage from './Frontpage/BasePage';
import userStore from './store';

function App() {
  const { login } = userStore();
  if (login) {
    return (
      <div id="page-wrapper">
        <BasePage />
      </div>
    );
  }
  return (
    <div id="page-wrapper">
      <Login />
    </div>
  );
}

export default App;
