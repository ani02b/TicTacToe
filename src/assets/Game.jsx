import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  const handleClick = (i) => {
    const historyUpToCurrent = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrent[historyUpToCurrent.length - 1];
    const squares = current.slice();

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToCurrent.concat([squares]));
    setStepNumber(historyUpToCurrent.length);
    setXIsNext(!xIsNext);
  };


  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className='heading'>
        <h1>Tic-Tac-Toe</h1>
      </div>
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>
          {winner ? `Winner: ${winner}` : isDraw ? 'Draw Game' : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Game;
