import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactCanvasProcess from '../src';

import './index.css';

interface ExampleProps {
  title: string;
}

const Example: React.FC<ExampleProps> = ({ title, children }) => (
  <div className='example'>
    <div className='border-wrapper'>
      { children }
      <p className='title'>{ title }</p>
    </div>
  </div>
);

const App = () => {
  const [percentage, setPercentage] = useState(20);

  const handleIncreasePercentage = () => {
    if (percentage < 100) {
      setPercentage(pre => (pre + 5 >= 100 ? 100 : pre + 5));
    }
  };

  const handleDecreasePercentage = () => {
    if (percentage > 0) {
      setPercentage(pre => (pre - 5 <= 0 ? 0 : pre - 5));
    }
  };

  return <div className='examples-wrapper'>
    <Example title='默认'>
      <ReactCanvasProcess
        percentage={80}
      />
    </Example>
    <Example title='使用生命周期回调函数'>
      <ReactCanvasProcess
        percentage={65}
        onAnimationStart={() => console.info('Animation Start🏁')}
        onAnimationEnd={() => console.info('Animation End✋')}
      />
    </Example>
    <Example title='自定义进度条弧度、字体大小、宽度、绘制宽度'>
      <ReactCanvasProcess
        percentage={80}
        width={40}
        fontSize={2}
        lineWidth={0.8}
        startAngle={4 / 5 * Math.PI}
        endAngle={1 / 5 * Math.PI}
      />
    </Example>
    <Example title='使用px单位自定义进度条弧度、字体大小、宽度、绘制宽度'>
      <ReactCanvasProcess
        unit='px'
        percentage={50}
        width={480}
        fontSize={24}
        lineWidth={10}
        startAngle={4 / 5 * Math.PI}
        endAngle={1 / 5 * Math.PI}
      />
    </Example>
    <Example title='自定义背景色、进度条颜色、字体颜色'>
      <ReactCanvasProcess
        bgColor='black'
        progressColor='white'
        fontColor='white'
        percentage={100}
        width={20}
        height={20}
        fontSize={2}
        lineWidth={0.8}
        startAngle={Math.PI / 2}
        endAngle={Math.PI / 2}
      />
    </Example>
    <Example title='动态变化百分比'>
      <ReactCanvasProcess
        percentage={percentage}
        onAnimationStart={() => console.info('Animation Start🏁')}
        onAnimationEnd={() => console.info('Animation End✋')}
      />
      <div className='click-group'>
        <button onClick={handleIncreasePercentage}>增加</button>
        <button onClick={handleDecreasePercentage}>减少</button>
      </div>
    </Example>
  </div>;
};

ReactDOM.render(
  <App />,
  document.querySelector('#app'),
);
