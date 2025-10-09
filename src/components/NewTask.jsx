import { useState } from "react"

export default function NewTask({onAdd,onDelete}){

    const [enteredTask,setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        // Add the task

        //Add validdation 
        if(enteredTask.trim()===''){
            return;
        }
        
        onAdd(enteredTask);
        setEnteredTask('');
    }


    return(
       <div className="flex gap-4 items-center mb-4">
        <input 
            type="text" 
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            onChange={handleChange}
            value={enteredTask}
         />
        <button 
            className="text-stone-700 hover:text-stone-950"
            onClick={handleClick}
            >Add Task</button>
       </div>
        
    )
}