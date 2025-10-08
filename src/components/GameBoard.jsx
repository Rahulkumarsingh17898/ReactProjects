import { useState } from "react";
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
const [GameBoardState, setGameBoardState] = useState(initialGameBoard); // we can use this state to keep track of the game board state

function handleCellClick(rowIndex, colIndex) {
    // we can use this function to handle the cell click event
    // for example we can update the game board state here
    setGameBoardState((prevState) => {
        const newState = [...prevState.map(innerArray => [...innerArray])]; // update Object state Immuatably this is recommended way
        newState[rowIndex][colIndex] = activePlayerSymbol; // for example we can set the cell to 'X' on click
        return newState;
    });

    onSelectSquare();

}

    return (
        <ol id="game-board">
            {GameBoardState.map((row, rowIndex) => (<li key={rowIndex} >
                <ol>
                    {row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleCellClick(rowIndex,colIndex)}>{col}</button> 
                            </li>
                        ))}
                </ol>
            </li>
        ))}
        </ol>
    )
}