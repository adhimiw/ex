import { useState } from "react";

export default function Calculator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  return (
    <div>
      <h2>Simple Calculator</h2>
      <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      <div>
        <button onClick={() => setResult(a + b)}>+</button>
        <button onClick={() => setResult(a - b)}>-</button>
        <button onClick={() => setResult(a * b)}>*</button>
        <button onClick={() => setResult(b !== 0 ? a / b : "Cannot divide by 0")}>/</button>
      </div>
      <p>Result: {result}</p>
    </div>
  );
}
