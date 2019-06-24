const _ = require('lodash');
const { waitFor } = require('../../utils/general');

const DIMENSIONS = 3;

const assertLineInARow = (board, rowIndex, symbol) => {
  const sameSymbolsInARow = board[rowIndex].filter(cell => cell === symbol);
  if (sameSymbolsInARow.length === DIMENSIONS) {
    return true;
  }
  return false;
};

const assertLineInACol = (board, colIndex, symbol) => {
  const sameSymbolsInACol = [];
  board.forEach((row) => {
    if (row[colIndex] === symbol) {
      sameSymbolsInACol.push(row[colIndex]);
    }
  });
  if (sameSymbolsInACol.length === DIMENSIONS) {
    return true;
  }
  return false;
};

const assertLineInLeftDiagonal = (board, rowIndex, colIndex, symbol) => {
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
  return false;
};

const assertLineInRightDiagonal = (board, rowIndex, colIndex, symbol) => {
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

const assertLine = (board, rowIndex, colIndex, symbol) => {
  const lineInARow = assertLineInARow(board, rowIndex, symbol);
  const lineInACol = assertLineInACol(board, colIndex, symbol);
  const lineInLeftDiagonal = assertLineInLeftDiagonal(board, rowIndex, colIndex, symbol);
  const lineInRightDiagonal = assertLineInRightDiagonal(board, rowIndex, colIndex, symbol);
  return lineInARow || lineInACol || lineInLeftDiagonal || lineInRightDiagonal;
};

const assertDraw = (board) => {
  let isDraw = true;
  board.forEach((row) => {
    row.forEach((col) => {
      if (col === '') {
        isDraw = false;
      }
    });
  });
  return isDraw;
};

const makeAIMove = async (gameState) => {
  const updatedGameState = _.cloneDeep(gameState);

  try {
    await waitFor(500);

    for (const [rowIndex, row] of updatedGameState.board.entries()) {
      for (const [colIndex, col] of row.entries()) {
        if (col === '') {
          updatedGameState.board[rowIndex][colIndex] = 'O';
          const lineCreated = assertLine(updatedGameState.board, rowIndex, colIndex, 'O');
          if (lineCreated) {
            updatedGameState.winner = 'O';
          } else {
            updatedGameState.isDraw = assertDraw(updatedGameState.board);
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
    const havePlayerWon = assertLine(gameState.board, selectedRow, selectedCol, 'X');
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
