import {forwordRef, useImperativeHandle,useRef} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ ref,targetTime,remainingTime,onReset }) {

    const dialog = useRef();

    const userLost = remainingTime<=0;
    const result = userLost ? 'lost' : 'won';
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    
    useImperativeHandle(ref,()=> {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })

    return createPortal (
    <dialog ref={dialog} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p> You Stopped the timer with <strong> {formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button >Close</button>
        </form>
    </dialog>,document.getElementById('modal')
    );
}

/*
export default function ResultModal({ ref,result,targetTime }) {

    return (
    <dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p> You Stopped the timer with <strong> X seconds left.</strong></p>
        <form method="dialog">
            <button >Close</button>
        </form>
    </dialog>
    );
}
    Will work with react version 19 or avove use forword ref for leeser react version
import {forwardRef} from "react";

const ResultModal = forwardRef (function ResultModal({result,targetTime},ref) {

    return (
    <dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p> You Stopped the timer with <strong> X seconds left.</strong></p>
        <form method="dialog">
            <button >Close</button>
        </form>
    </dialog>
    );
});
*/
