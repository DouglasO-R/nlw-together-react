import { useState } from "react";


export function Contador(){
    const [counter,setCounter] = useState(0);

    function increment(){
        setCounter(counter + 1);
        console.log(counter);
    }

    return (
        <div>
            <button onClick={increment}>{counter}</button>
        </div>
    )
}