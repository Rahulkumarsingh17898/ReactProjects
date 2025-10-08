import { useState,useRef } from "react";
import ResultModal from "./ResultModal";
// let timer;

export default function TimerChallenge({title, targetTime}) {
    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);

    const timerRef = useRef(); // to persist the timer variable across re-renders without causing re-renders itself
    const dialogRef = useRef();


    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining> 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0 ){
        clearInterval(timerRef.current);
        dialogRef.current.open();
    }

    function resetTimer(){
        setTimeRemaining(targetTime * 1000);
    }   

    function handleStart(){

        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining-10);
        },10);


        /*
         timerRef.current = setTimeout(() => {
            setTimerExpired(true);
            dialogRef.current.open();
        }, targetTime * 1000);
        setTimerStarted(true);
        */
    }

    function handleStop() {
        dialogRef.current.open();
        clearInterval(timerRef.current);
    }

    return (
        <>
      
        <ResultModal 
        ref={dialogRef} 
        remainingTime={timeRemaining}
        targetTime={targetTime} 
        onReset={resetTimer}
        />
   
        <section className="challenge">
            <h2>{title}</h2>
           
            <p className="challenge-time">
                {targetTime} seconds{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}> {timerIsActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className="{timerIsActive ? 'active' : undefined}">
                { timerIsActive ? 'Time is running...' :  'Timer inactive'}
            </p>
        </section>
        </>
    )
}


/*

let timer;

    function handleStart(){
         timer = setTimeout(() => {
            setTimerExpired(true)
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer);
    }

    This will not work as timer variable will be reset on every re-render of the component. To fix this, we can use useRef hook to persist the value across re-renders without causing re-renders itself.


    One hack is to make the timer variable global outside the component function. But this is not a good practice as it can lead to bugs if multiple instances of the component are rendered.
*/

/*
 <ResultModal ref={dialogRef} result='Lost' targetTime={targetTime} />
passing ref as a prop will only work with react version 19 or above . for lower versions, we need to use forwardRef in the ResultModal component to forward the ref to the dialog element inside it.
*/