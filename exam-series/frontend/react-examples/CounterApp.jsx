import { useState } from "react";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter App</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
    </div>
  );
}
