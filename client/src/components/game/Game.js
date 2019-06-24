import React, { useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { cloneDeep } from 'lodash';

import './Game.css';
import makeHttpRequest from '../../API';

function Game(props) {
  const { location } = props;
  const { username } = location.state;

  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const initialGameState = {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    isDraw: false,
    winner: '',
  };

  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    if (gameState.winner || gameState.isDraw) {
      const updatedScore = cloneDeep(score);
      let msg;
      if (gameState.winner) {
        msg = `${gameState.winner} Wins!`;
        updatedScore[gameState.winner] += 100;
      } else {
        msg = 'It`s a Draw';
        updatedScore.X += 10;
        updatedScore.O += 10;
      }
      window.alert(msg);
      setScore(updatedScore);
      setGameState(initialGameState);
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
      <h4>{username} (X) vs AI (O)</h4>
      <div className="score">
        Score: {score.X} - {score.O}
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
