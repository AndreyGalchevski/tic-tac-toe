import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

import './Game.css';
import makeHttpRequest from '../../API';

function Game() {
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
    if (gameState.winner) {
      window.alert(`${gameState.winner} Wins`);
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
      <table>
        <tbody>
          {gameState.board.map((row, rowIndex) => (
            <tr>
              {row.map((col, colIndex) => (
                <td onClick={() => handleCellClick(rowIndex, colIndex)}>
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

export default Game;
