// import { useState } from "react";
import "./TicTacToe.css";

const Box = () => {
  return <div className="box"></div>;
};

export function TicTacToe() {
  // const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  // const [lockGame, setLockGame] = useState(false);
  const boxes = new Array(9).fill(null);
  console.log(boxes);

  // const addSymbol = () => {
  //  if (lockGame) return;
  // };

  return (
    <div className="container">
      <div className="board">
        {boxes.map((_, index) => (
          <Box key={index} />
        ))}
      </div>
      <button className="reset-button">Reset</button>
    </div>
  );
}

export default TicTacToe;
