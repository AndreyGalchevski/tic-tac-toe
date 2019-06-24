const _ = require('lodash');
const { waitFor } = require('../../utils/general');

const assetLine = (board, rowIndex, colIndex, symbol) => {
  const DIMENSIONS = 3;

  const sameSymbolsInARow = board[rowIndex].filter(cell => cell === symbol);
  if (sameSymbolsInARow.length === DIMENSIONS) {
    return true;
  }

  const sameSymbolsInACol = [];
  board.forEach((row) => {
    if (row[colIndex] === symbol) {
      sameSymbolsInACol.push(row[colIndex]);
    }
  });
  if (sameSymbolsInACol.length === DIMENSIONS) {
    return true;
  }

  if (rowIndex === colIndex) {
    const sameSymbolsInLeftDiagonal = [];
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (i === j && col === symbol) {
          sameSymbolsInLeftDiagonal.push(col);
        }
      });
    });

    if (sameSymbolsInLeftDiagonal.length === DIMENSIONS) {
      return true;
    }
  }

  if (
    (rowIndex === 0 && colIndex === DIMENSIONS - 1)
    || (rowIndex === DIMENSIONS - 1 && colIndex === 0)
  ) {
    const rightDiagonal = [board[DIMENSIONS - 1][0], board[1][1], board[0][DIMENSIONS - 1]];
    const sameSymbolsInRightDiagonal = rightDiagonal.filter(el => el === symbol);

    if (sameSymbolsInRightDiagonal.length === DIMENSIONS) {
      return true;
    }
  }

  return false;
};

const checkIfPlayerWon = (board, selectedRow, selectedCol) => {
  const lineCreated = assetLine(board, selectedRow, selectedCol, 'X');
  return lineCreated;
};

const makeAIMove = async (gameState) => {
  const updatedGameState = _.cloneDeep(gameState);

  try {
    await waitFor(500);

    for (const [rowIndex, row] of updatedGameState.board.entries()) {
      for (const [colIndex, col] of row.entries()) {
        if (col === '') {
          updatedGameState.board[rowIndex][colIndex] = 'O';
          const lineCreated = assetLine(updatedGameState.board, rowIndex, colIndex, 'O');
          if (lineCreated) {
            updatedGameState.winner = 'O';
          }
          return updatedGameState;
        }
      }
    }
    return updatedGameState;
  } catch (error) {
    throw error;
  }
};

const makeMove = async ({ gameState, selectedRow, selectedCol }) => {
  let updatedGameState;

  try {
    const havePlayerWon = checkIfPlayerWon(gameState.board, selectedRow, selectedCol);
    if (havePlayerWon) {
      updatedGameState = _.cloneDeep(gameState);
      updatedGameState.winner = 'X';
      return updatedGameState;
    }
    updatedGameState = await makeAIMove(gameState);
    return updatedGameState;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  makeMove,
};
