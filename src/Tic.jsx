import React from "react";
import { useEffect } from "react";
function Square({ value,onClick }) {
  return (
    <button className="border-2 w-20 h-20 border-amber-700 text-3xl" onClick={onClick}>{value}</button>
  );
}
const Tic = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = React.useState(true);
  const [status, setStatus] = React.useState("");

  function handleClick(i) { 
    const newSquares = squares.slice();
    if(getWinner(squares)||newSquares[i])return
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXisNext(!xIsNext);

  }
  function getWinner(squares) { 
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    const winner = getWinner(squares);
    if (!getWinner(squares) && squares.every((square) => square !== null)) {
      setStatus("Draw");
    }
   else if (winner) {
      setStatus(`Winner: ${winner}`);
    } else {
      setStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [squares, xIsNext]);
  
  function Restart() { 
    setSquares(Array(9).fill(null));
    setXisNext(true);
    setStatus("");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <h1 className="text-3xl font-bold underline">Tic Tac Toe</h1>
      <div className="flex mt-4 bg-gray-300">
        <Square value={squares[0]} onClick={()=>handleClick(0)} />
        <Square value={squares[1]} onClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onClick={()=>handleClick(2)}/>
      </div>
      <div className="flex -mt-1 bg-gray-300">
        <Square value={squares[3]} onClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onClick={()=>handleClick(5)}/>
      </div>
      <div className="flex -mt-1 bg-gray-300">
        <Square value={squares[6]} onClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onClick={()=>handleClick(8)}/>
      </div>
      <h2 className="text-3xl my-3.5">{status}</h2>
      <button onClick={Restart} className="border-1 p-1 bg-amber-400 rounded-2xl my-4.5">Restart</button>
    </div>
  );
};

export default Tic;
