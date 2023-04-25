import { useState } from 'react';
import { useRef } from 'react';
import './App.css';


function App() {

  const [display, setDisplay] = useState(0);

  const handleZeroPress = (e) => {
    const text = e.target.textContent;

    setDisplay(prevState => {
      return parseFloat(prevState) === 0 ? prevState : `${prevState}${text}`;
    })
  }

  const handleDecimalPress = (e) => {
    const text = e.target.textContent;

    setDisplay(prevState => {
      return /[-+/*]/.test(prevState) && /[-+*/]\d*\.\d+$/.test(prevState) ? prevState 
      : !/[-+/*]/.test(prevState) && /\./.test(prevState) ? prevState
      : `${prevState}${text}`;
    })
  }

  const handleKeyPress = (e) => {
    const text = e.target.textContent;
    
    setDisplay(prevState => {
      return prevState === 0 ? text : `${prevState}${text}`;
    });
  }

  const handleEqualsPress = () => {

    setDisplay(prevState => {
      const expression = prevState.replace(/[*\/+-]+/g, match => {
        return match.charAt(match.length - 1) === '-' ? match.slice(-2) : match.slice(-1);
      });
      const result = new Function(`return ${expression}`)();
      return result;
    })    
  }

  const handleOperatorPress = (e) => {
    const text = e.target.textContent;
    
    setDisplay(prevState => {
      return `${prevState}${text}`;
    // return /[*\/+-]$/.test(prevState) ? prevState.replace(/.$/, text) : `${prevState}${text}`;
    })
  }

  return (
    <div id="wrapper">
      <div id='display'>
        {display}
      </div>
      <div className="calculator">
        <button id="seven" onClick={handleKeyPress}>7</button>
        <button id="eight" onClick={handleKeyPress}>8</button>
        <button id="nine" onClick={handleKeyPress}>9</button>
        <button id="multiply" onClick={handleOperatorPress}>*</button>
        <button id="four" onClick={handleKeyPress}>4</button>
        <button id="five" onClick={handleKeyPress}>5</button>
        <button id="six" onClick={handleKeyPress}>6</button>
        <button id="subtract" onClick={handleOperatorPress}>-</button>
        <button id="one" onClick={handleKeyPress}>1</button>
        <button id="two" onClick={handleKeyPress}>2</button>
        <button id="three" onClick={handleKeyPress}>3</button>
        <button id="add" onClick={handleOperatorPress}>+</button>
        <button id="zero" onClick={handleZeroPress}>0</button>
        <button id="decimal" onClick={handleDecimalPress}>.</button>
        <button id="equals" onClick={handleEqualsPress}>=</button>
        <button id="divide" onClick={handleOperatorPress}>/</button>
        <button id="clear" onClick={() => setDisplay(0)}>AC</button>
      </div>
    </div>
  )
}

export default App


