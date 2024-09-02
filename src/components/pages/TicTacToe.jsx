import PropTypes from "prop-types";
import { useState } from "react";
import useCheckWinner from "./CheckWinner";
import "./TicTacToe.css";

const Box = ({ onClick, symbolPath }) => {
  return (
    <div className="box" onClick={onClick}>
      {symbolPath && <img src={symbolPath} alt="Symbol" />}
    </div>
  );
};

const WinnerMessage = ({ winner }) => {
  return (
    <div className={`winner-message ${winner ? "" : "hidden"}`}>
      <span className="winner-text">
        {winner === " " ? "Empate!" : `${winner} Ganó!`}
      </span>
    </div>
  );
};

export function TicTacToe() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

  const winner = useCheckWinner(board);

  const handleBoxClick = (index) => {
    if (boxes[index]) return; // No hacer nada si la casilla ya está ocupada

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
      <WinnerMessage winner={winner} hidden={winner} />
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

WinnerMessage.propTypes = {
  winner: PropTypes.string,
  hidden: PropTypes.string,
};

export default TicTacToe;
