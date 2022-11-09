import './App.scss';
import React from 'react';
import Login from './login';
import BasePage from './Frontpage/BasePage';
import userStore from "./store";

function App() {

  const { showBasePage } = userStore();

  return (
    <div id="page-wrapper">
        {!showBasePage && <Login />}

        {showBasePage && <BasePage />}
    </div>
  );
}

export default App;
