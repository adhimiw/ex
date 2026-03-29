import { useState } from 'react';
import './App.css';

const buttons = [
  'C', 'DEL', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '=',
];

function App() {
  const [expression, setExpression] = useState('');
  const ops = new Set(['+', '-', '*', '/', '%']);

  const handleClick = (value) => {
    if (value === 'C') return setExpression('');
    if (value === 'DEL') return setExpression((exp) => exp.slice(0, -1));
    if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        setExpression((exp) => String(eval(exp || '0')));
      } catch {
        setExpression('Error');
      }
      return;
    }
    setExpression((exp) => {
      const last = exp.slice(-1);
      if (ops.has(value) && ops.has(last)) return exp.slice(0, -1) + value;
      return exp + value;
    });
  };

  return (
    <main className="calculator">
      <div className="display">{expression || '0'}</div>
      <div className="grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`btn ${btn === '=' ? 'primary' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
