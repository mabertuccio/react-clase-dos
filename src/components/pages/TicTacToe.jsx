import PropTypes from "prop-types";
import { useState, useCallback } from "react";
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
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gamePattern, setGamePattern] = useState({ P1: [], P2: [] });

  const handleBoxClick = (index) => {
    if (boxes[index]) return; // No hacer nada si la casilla ya está ocupada

    const newBoxes = boxes.slice();
    const symbolPath = isPlayerOneTurn
      ? "src/assets/cross.png"
      : "src/assets/circle.png";

    newBoxes[index] = symbolPath;

    // Actualizar el patrón del juego
    setGamePattern((prevGamePattern) => ({
      ...prevGamePattern,
      [isPlayerOneTurn ? "P1" : "P2"]: [
        ...prevGamePattern[isPlayerOneTurn ? "P1" : "P2"],
        index,
      ],
    }));

    setBoxes(newBoxes);
    setIsPlayerOneTurn(!isPlayerOneTurn);

    // Verificar el ganador después de actualizar el estado
    checkWinner(newBoxes, isPlayerOneTurn ? "P1" : "P2");
  };

  const checkWinner = useCallback(
    (newBoxes, currentPlayer) => {
      const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const currentPlayerPattern = gamePattern[currentPlayer];

      const hasWinner = winningPatterns.some((pattern) =>
        pattern.every((index) => currentPlayerPattern.includes(index))
      );

      if (hasWinner) {
        alert(`${currentPlayer === "P1" ? "Player 1" : "Player 2"} wins!`);
        resetGame();
      }
    },
    [gamePattern]
  );

  const resetGame = () => {
    setBoxes(Array(9).fill(null));
    setGamePattern({ P1: [], P2: [] });
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
