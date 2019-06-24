import React, { useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { cloneDeep } from 'lodash';

import './Game.css';
import makeHttpRequest from '../../API';

function Game(props) {
  const { location } = props;
  const { username } = location.state;

  const [gameState, setGameState] = useState({
    board: [
      ['', 'O', ''],
      ['O', 'X', ''],
      ['', 'X', 'O'],
    ],
    isDraw: false,
    winner: '',
  });

  useEffect(() => {
    if (gameState.winner || gameState.isDraw) {
      const msg = gameState.winner ? `${gameState.winner} Wins` : 'Its a Draw';
      window.alert(msg);
      setGameState({
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        isDraw: false,
        winner: '',
      });
    }
  }, [gameState]);

  async function handleCellClick(rowIndex, colIndex) {
    const updatedGameState = cloneDeep(gameState);
    updatedGameState.board[rowIndex][colIndex] = 'X';
    setGameState(updatedGameState);

    const data = {
      gameState: updatedGameState,
      selectedRow: rowIndex,
      selectedCol: colIndex,
    };
    const res = await makeHttpRequest('PUT', '/api/game/make-move', data);
    setGameState(res.data);
  }

  return (
    <section>
      <h4>{username} (X) VS AI (O)</h4>
      <div>
        Score: 0 - 0
      </div>
      <table>
        <tbody>
          {gameState.board.map((row, rowIndex) => (
            <tr>
              {row.map((col, colIndex) => (
                <td onClick={col ? null : () => handleCellClick(rowIndex, colIndex)}>
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

Game.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default Game;
