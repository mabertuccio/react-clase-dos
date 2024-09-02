import { useEffect, useState } from "react";

const useCheckWinner = (board) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkWinner = () => {
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
          setWinner(board[a]);
          return;
        }
      }

      if (board.every((cell) => cell)) {
        setWinner(" ");
      }
    };

    checkWinner();
  }, [board]);
  return winner;
};

export default useCheckWinner;
