import {useState} from 'react'

export default function Player({ initialName, symbol, isActive,onChangeName})  {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)

    function handleEditClick() {
        console.log("Button clicked ", isEditing);
        // setIsEditing(!isEditing);//This is not recommended to set state based on previous state 
        /*  The reason is behind the scene react schedules state updates and it will not work if we have multiple scheduling of state updates
        For example if we have two buttons and we click them both in quick succession then the state update may not work as expected
        */
        setIsEditing((isEditing) => !isEditing); // we can also use any variable name instead of isEditing as it is set by react internally and this way it is guaranteed to have the latest state value
        /* for example we can also do like this  setIsEditing((prevState) => !prevState); */
        console.log("State after ", isEditing);

        if(isEditing){
          onChangeName(symbol, playerName); // we can call the onChangeName function here to update the player name in the parent component
        }
        
    }

    function handleNameChange(event) {
      // console.log(event);
      setPlayerName(event.target.value);
    }

    console.log(" Rendering Triggerred", isEditing);

    let playerNameElement;
    if (isEditing) {
        playerNameElement = <input type="text" className="player-name" defaultValue={playerName} onChange={handleNameChange}/>;  // don't use value instead use defaultValue here as value will make the input field non editable
    /*
    The above is also an example of two way binding where the input field value is bound to the state variable and the state variable is updated on change of input field value
    */
      } else {
        playerNameElement = <span className="player-name">{playerName}</span>;
    }


  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameElement}
      <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
          {isEditing? 'Save' : 'Edit'}
      </button>
    </li>
  )
}

/*
one way to do it is 
 const [isEditing, setIsEditing] = useState(false);
    function changeEditingState() {
        console.log("Button clicked ", isEditing);
        setIsEditing(!isEditing);
        console.log("State after ", isEditing);
    }

    console.log(" Rendering Triggerred", isEditing);

return (
    <li className="player">
      { !isEditing &&  < span className="player-name">{name}</span> }
      {isEditing && <input type="text" className="player-name" defaultValue={name} />}
      <span className="player-symbol">{symbol}</span>
      <button onClick={changeEditingState}>
        Edit
      </button>
    </li>
  )
*/