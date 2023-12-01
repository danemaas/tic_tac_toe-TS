import { useState, useEffect } from "react";

//define type of object Scores
type Scores = {
  [key: string]: number;
};

//inital state of board
const INIT_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

//initail scores
const INIT_SCORES: Scores = { x: 0, o: 0 };

//winning combos for checking of winner
const WINNING_COMBOS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Top-left to bottom-right diagonal
  [2, 4, 6], // Top-right to bottom-left diagonal
];

const App = () => {
  const [board, setBoard] = useState(INIT_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [scores, setScores] = useState(INIT_SCORES);

  //this will track of everything that is happening in the app
  useEffect(() => {
    const winner = checkForWinner();
    if (!winner && winner !== "draw") {
      if (board.includes("x") || board.includes("o")) changePlayer();
    } else if (winner === "draw") {
      setTimeout(() => handleDraw(), 200);
    } else if (winner === "x" || winner === "o") {
      setTimeout(() => handleWin(), 200);
    }
  }, [board]);

  //function to reset the board to its initial value once game is concluded
  const resetBoard = () => setBoard(INIT_GAME_STATE);

  //function for handling the win state
  const handleWin = () => {
    window.alert(
      `Congrats player ${currentPlayer.toUpperCase()}! You are the winner!`
    );
    const newScores = { ...scores };
    newScores[currentPlayer] = scores[currentPlayer] + 1;
    setScores(newScores);
    setCurrentPlayer("x");
    resetBoard();
  };

  //function for handling the draw state
  const handleDraw = () => {
    window.alert("The game ended in a draw");
    setCurrentPlayer("x");
    resetBoard();
  };

  //function to check for the winner
  const checkForWinner = () => {
    //iterate all combos of winning combos
    for (const combination of WINNING_COMBOS) {
      const [a, b, c] = combination; //destructure the combos to 3 indexes
      //check per squares of board if the values matches either x or o
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // return the winner (x or o)
      }
    }

    if (board.every((cell) => cell)) {
      return "draw"; //if all cells have been clicked return a draw
    }

    return null; //if still no winner return a null
  };

  //function to change player
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  };

  //function to handle the player move with param event with type any
  const handlePlayerMove = (event: any) => {
    //get the cell index of the board that's been clicked by the player
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    //get the current value of the cell
    const currentValue = board[cellIndex];
    //if there is a current value then return since we don't want to overwrite the values
    //of the cells that already has a move of the player
    if (currentValue) return;

    //if the cell is empty then update the cell with the value of the current player
    const newValues = [...board];
    newValues[cellIndex] = currentPlayer;
    setBoard(newValues);
  };

  return (
    <main className="w-full min-h-screen p-8 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl text-white font-display font-semibold mb-10">
        Tic Tac Toe Game
      </h1>
      <div className="">
        <div className="max-w-[400px] mx-auto grid grid-cols-3 gap-3">
          {board.map((player, index) => (
            <Square
              key={index}
              player={player}
              index={index}
              onClick={handlePlayerMove}
            />
          ))}
        </div>
        <div className="w-[400px] mx-auto my-10 flex flex-col justify-center items-center gap-1 font-display">
          <p className="mb-3 text-2xl">
            Player Turn:{" "}
            <span
              className={`
                ${currentPlayer === "x" ? "text-red-800" : "text-orange-500"}
              `}
            >
              {currentPlayer.toUpperCase()}
            </span>
          </p>
          <div className="w-full flex justify-around items-center gap-5">
            <p className="text-red-800 text-xl">
              Player X wins: <span>{scores["x"]}</span>
            </p>
            <p className="text-orange-500 text-xl">
              Player O wins: <span>{scores["o"]}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

//define the props of the Square component
type Props = {
  player?: string; // which is the player x or o
  index?: number; // the cell index
  onClick?: (event: any) => void; // this is for the handlePlayerMove function
};

const Square = ({ player, index, onClick }: Props) => {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "x" ? "text-red-800" : "text-orange-500";
  const hoverStyle = "transition duration-300 hover:scale-105 transform";

  return (
    <div
      onClick={onClick}
      data-cell-index={index}
      className={`h-32 border-4 border-slate-800 font-display text-6xl
              flex justify-center items-center cursor-pointer  ${hoverStyle}`}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-200 ease-out ${scale} ${textColor}`}
      >
        {player}
      </span>
    </div>
  );
};

export default App;
