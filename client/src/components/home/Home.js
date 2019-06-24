import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import './Home.css';

function Home(props) {
  const { history } = props;
  const [username, setUsername] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleStartGameClick() {
    if (!username) {
      window.alert('Enter username to continue');
      return;
    }
    history.push({ pathname: '/game', state: { username } });
  }

  return (
    <section>
      <h4>Tic Tac Toe</h4>
      <input
        type="text"
        className="username-input"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter your username"
      />
      <div>
        <button type="button" onClick={() => handleStartGameClick()}>Start The Game</button>
      </div>
    </section>
  );
}

Home.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Home;
