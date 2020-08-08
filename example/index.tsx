import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactCanvasProcess from '../src';

import './index.css';

const App = () => {
  const [percentage, setPercentage] = useState(20);

  const handleClick = (value: number) => {
    setPercentage(pre => pre + value);
  };

  return <div className='wrapper'>
    <ReactCanvasProcess
      percentage={80}
      width={40}
      fontSize={2}
      lineWidth={0.8}
      startAngle={4 / 5 * Math.PI}
      endAngle={1 / 5 * Math.PI}
    />
    <div>
      <ReactCanvasProcess
        bgColor='lightgreen'
        percentage={percentage}
        width={20}
        height={20}
        fontSize={2}
        lineWidth={0.8}
        startAngle={Math.PI / 2}
        endAngle={Math.PI / 2}
      />
      <div className='click-group'>
        <button onClick={() => handleClick(10)}>Increase</button>
        <button onClick={() => handleClick(-10)}>Decrease</button>
      </div>
    </div>
  </div>;
};

ReactDOM.render(
  <App />,
  document.querySelector('#app'),
);
