import PropTypes from "prop-types";
import { useState } from "react";
import "./TicTacToe.css";

const Box = ({ onClick, symbolPath }) => {
  return (
    <div className="box" onClick={onClick}>
      {symbolPath && <img src={symbolPath} alt="Symbol" />}
    </div>
  );
};

export function TicTacToe() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

  const checkWinner = (board) => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPattern.length; i++) {
      const [a, b, c] = winningPattern[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const hasWinner = checkWinner(board);

  const handleBoxClick = (index) => {
    if (boxes[index] || hasWinner) return; // No hacer nada si la casilla ya está ocupada

    const newBoxes = boxes.slice();
    const symbolPath = isPlayerOneTurn
      ? "src/assets/cross.png"
      : "src/assets/circle.png";

    newBoxes[index] = symbolPath;

    const newBoard = [...board];
    const newIndex = index;
    const newValue = isPlayerOneTurn ? "X" : "O";
    newBoard[newIndex] = newValue;

    setBoxes(newBoxes);
    setBoard(newBoard);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(null));
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true); // Inicia el juego con el turno del Jugador 1
  };

  return (
    <div className="container">
      <div className="board">
        {boxes.map((symbolPath, index) => (
          <Box
            key={index}
            onClick={() => handleBoxClick(index)}
            symbolPath={symbolPath}
          />
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

Box.propTypes = {
  onClick: PropTypes.func.isRequired,
  symbolPath: PropTypes.string,
};

export default TicTacToe;
