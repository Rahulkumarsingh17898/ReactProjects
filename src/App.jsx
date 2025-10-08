import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import GameBoardV2 from "./components/GameBoardV2";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations"; 
import GameOver from "./components/GameOver";
const initialGameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    

    

function App() {
  const [players, setPlayers] = useState([
    {name: 'Player 1', symbol: 'X'},
    {name: 'Player 2', symbol: 'O'}
  ]); 
  const [gameTurns, setGameTurns] = useState([]); // we can use this state to keep track of the number of turns played
  // const [activePlayer, setActivePlayer] = useState('X'); // we can use this state to keep track of the active player
  // Since now we have gameTurns State activeplaer is redundant state

  const activePlayer = deriveActivePlayer(gameTurns);
  // let gameBoard = initialGameBoard; // this is just a reference and we are not mutating it directly
let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]; // create a new array with nested arrays to avoid mutating the initialGameBoard directly
    for (const turn of gameTurns) {
        console.log("turn logged:",turn);
        const {square,player} = turn;
        const {row, col} = square;
        
        gameBoard[row][col] = player;
    }


    let checkWinnerResult = checkWinner(gameBoard);

  function deriveActivePlayer(gameTurns) {
     let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      return currentPlayer;
  }

  function checkWinner(gameBoard) {
      console.log("Checking for winner in gameBoard:", gameBoard);

      for (const combination of WINNING_COMBINATIONS) {
        
        const firstValue = gameBoard[combination[0].row][combination[0].column];
        const secondValue = gameBoard[combination[1].row][combination[1].column];
        const thirdValue = gameBoard[combination[2].row][combination[2].column];
        console.log("Checking combination:", combination, "Values:", firstValue, secondValue, thirdValue);
        if(firstValue && firstValue === secondValue && firstValue === thirdValue) {
          console.log("Winner found:", firstValue);
          return {isWinner: true, winner: players.find(p => p.symbol === firstValue).name};
        }
        
    }
    return {isWinner: false, winner: null};
  }

  const hasDraw = gameTurns.length === 9 && !checkWinnerResult.isWinner;
  function handleSelectSquare(rowIndex, colIndex) {
    console.log("Square selected by player ", activePlayer);
    // setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));

    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X';
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }

      let currentPlayer = deriveActivePlayer(prevTurns); // we can use the derived active player here

      const updatedTurns = [
          {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
          ...prevTurns,
        ] ;

      return updatedTurns;
    }); // we can use this to keep track of the number of turns played
  }

  function handleRestart() {
    setGameTurns([]);
    // setActivePlayer('X');
  }

  function handlePlayerNameCange(symbol, newName) {
    setPlayers((prevPlayers) => { 
      return prevPlayers.map((player) => {
        if(player.symbol === symbol) {
          return {...player, name: newName};
        }
        return player;
      });
    }); 
  }

  return (
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerNameCange}/>
        <Player initialName="Player 2" symbol="O" isActive={activePlayer ==='O'} onChangeName={handlePlayerNameCange}/>
      </ol>
      {(checkWinnerResult.isWinner || hasDraw) && <GameOver winner={checkWinnerResult.winner} onrRstart={handleRestart} />}
        <GameBoardV2 onSelectSquare={handleSelectSquare} turns={gameTurns} gameBoard = {gameBoard}/>

    </div>
    <Log turns={gameTurns}/>
    </main>
  )
}

export default App
