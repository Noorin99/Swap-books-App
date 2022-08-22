import React, { useState } from "react";

function Counter({ initial }) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount((e) => e + 1);
  };

  const decrement = () => {
    setCount((e) => e - 1);
  };

  const restart = () => {
    setCount(0);
  };

  const switchSigns = () => {
    setCount((e) => e * -1);
  };

  return (
    <div>
      Counter
      <span data-testid="count">{count}</span>
      <button onClick={increment}>Increment++</button>
    </div>
  );
}

export default Counter;
