// Practical 2: Calculator App
// Adds, subtracts, multiplies and divides two numbers using numeric inputs
import React, { useState } from 'react';
import { Calculator, Plus, Minus, X, Divide, RotateCcw, Sparkles } from 'lucide-react';

export default function Practical2Calculator({ onToast }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [lastOp, setLastOp] = useState(null);

  // Exact calculate function from the practical record
  const calculate = (op) => {
    setLastOp(op);
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    // Step 6: If either value is not a number, show a message and stop.
    if (isNaN(a) || isNaN(b)) {
      setResult('Enter both numbers');
      return;
    }

    // Step 7: Perform the operation according to the button pressed.
    if (op === '+') setResult(String(a + b));
    if (op === '-') setResult(String(a - b));
    if (op === '*') setResult(String(a * b));

    // Step 8: For division, check for zero first.
    if (op === '/') {
      setResult(b === 0 ? 'Cannot divide by 0' : String(a / b));
    }

    if (onToast) {
      const displayOp = op === '*' ? '×' : op === '/' ? '÷' : op;
      onToast(`Calculated ${a} ${displayOp} ${b}`, 'info');
    }
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult('');
    setLastOp(null);
  };

  const loadPreset = (val1, val2, op) => {
    setNum1(String(val1));
    setNum2(String(val2));
    setTimeout(() => {
      calculate(op);
    }, 50);
  };

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 2</div>
        <h2 className="rn-heading">Calculator App</h2>
        <p className="rn-subheading">Arithmetic Operations & Zero-Division Guard</p>
      </div>

      {/* Input 1 */}
      <div className="rn-input-group">
        <label className="rn-label">First Number (num1):</label>
        <input
          type="number"
          className="rn-text-input rn-numeric-input"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="First number"
          step="any"
        />
      </div>

      {/* Input 2 */}
      <div className="rn-input-group">
        <label className="rn-label">Second Number (num2):</label>
        <input
          type="number"
          className="rn-text-input rn-numeric-input"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Second number"
          step="any"
        />
      </div>

      {/* Operation Buttons Row */}
      <div className="rn-calc-btn-grid">
        <button
          type="button"
          className={`rn-calc-btn ${lastOp === '+' ? 'active-op' : ''}`}
          onClick={() => calculate('+')}
          title="Addition (+)"
        >
          <Plus size={22} />
          <span>+</span>
        </button>

        <button
          type="button"
          className={`rn-calc-btn ${lastOp === '-' ? 'active-op' : ''}`}
          onClick={() => calculate('-')}
          title="Subtraction (-)"
        >
          <Minus size={22} />
          <span>-</span>
        </button>

        <button
          type="button"
          className={`rn-calc-btn ${lastOp === '*' ? 'active-op' : ''}`}
          onClick={() => calculate('*')}
          title="Multiplication (x)"
        >
          <X size={22} />
          <span>x</span>
        </button>

        <button
          type="button"
          className={`rn-calc-btn ${lastOp === '/' ? 'active-op' : ''}`}
          onClick={() => calculate('/')}
          title="Division (/)"
        >
          <Divide size={22} />
          <span>/</span>
        </button>
      </div>

      {/* Result Display as specified: Result: {result} */}
      <div className={`rn-result-display ${result ? 'has-result' : ''}`}>
        <span className="rn-result-label">Output Display</span>
        <div className="rn-result-value">
          Result: <span className="highlight-val">{result || '—'}</span>
        </div>
      </div>

      {/* Reset & Practical Manual Quick Presets */}
      <div className="rn-calc-helpers">
        <button type="button" className="rn-mini-btn" onClick={handleReset}>
          <RotateCcw size={14} /> Clear
        </button>
        <div className="rn-preset-group">
          <span className="preset-label">Test cases:</span>
          <button
            type="button"
            className="rn-preset-badge"
            onClick={() => loadPreset(12, 8, '*')}
            title="Standard manual sample output"
          >
            <Sparkles size={12} /> 12 × 8 (96)
          </button>
          <button
            type="button"
            className="rn-preset-badge"
            onClick={() => loadPreset(15, 0, '/')}
            title="Zero check validation"
          >
            15 ÷ 0 (Div 0)
          </button>
        </div>
      </div>
    </div>
  );
}
