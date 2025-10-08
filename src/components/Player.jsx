import { useState,useRef } from "react";

export default function Player() {
  const [EnteredPlayerName, setEnteredPlayerName] = useState(null);
  const playerName = useRef(); // when we want to read value from a input field without needing to re-render the component on every keystroke

function handleSetName(){
  setEnteredPlayerName(playerName.current.value);
  playerName.current.value = ''; // clear input field after setting name
}


  return (
    <section id="player">
      <h2>Welcome {EnteredPlayerName ?? 'Unknown entity'}</h2> 
      <p>
        <input 
        ref={playerName}
        type="text" />
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}

// <h2>Welcome {EnteredPlayerName ?? 'Unknown entity'}</h2> >if EnteredPlayerName is null, show 'Unknown entity' shortcut for ternary operator EnteredPlayerName ? EnteredPlayerName : 'Unknown entity'
