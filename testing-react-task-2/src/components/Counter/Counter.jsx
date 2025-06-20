import { useState } from "react";
import "./Counter.css";
import CustomButton from "../Button/Button";

export default function NumberCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return (
    <>
      <div className="counter">
        <CustomButton onClick={decrement} aria-label="Decrement"> -</CustomButton>
        

        <h1 className="count">{count}</h1>
        
        <CustomButton onClick={increment}  aria-label="Increment"> +</CustomButton>
      </div>
      <CustomButton onClick={reset} className="reset-btn"> Reset</CustomButton>
     
    </>
  );
}

