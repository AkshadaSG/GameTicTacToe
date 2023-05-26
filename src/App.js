import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if already marked or there's a winner

    const updatedBoard = [...board];
    updatedBoard[index] = player;
    setBoard(updatedBoard);

    const currentWinner = calculateWinner(updatedBoard);
    if (currentWinner) {
      setWinner(currentWinner);
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const renderCell = (index) => (
    <div className={`cell ${board[index]}`} onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  const calculateWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const renderStatus = () => {
    if (winner) {
      return <div className="status">Winner: {winner}</div>;
    } else if (board.every((cell) => cell !== null)) {
      return <div className="status">It's a draw!</div>;
    } else {
      return <div className="status">Next player: {player}</div>;
    }
  };

  return (
    <div className="tic-tac-toe">
      <div className="board">
        <div className="row">
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </div>
        <div className="row">
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </div>
        <div className="row">
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </div>
      </div>
      {renderStatus()}
      <button className="reset-btn" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
