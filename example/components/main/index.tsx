import React, { useState } from 'react';
import { Example } from '../example';
import ReactCanvasProcess from '../../../src';

const Main = () => {
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

  return <main className='container-fluid d-flex pl-5 pr-5'>
  <div className='col-6 pl-3 pr-3 pt-3 pb-5'>
    <Example
      title='默认'
      code={`
        <ReactCanvasProcess percentage={80} />
      `}
    >
      <ReactCanvasProcess
        percentage={80}
      />
    </Example>

    <Example
      title='自定义进度条弧度、字体大小、宽度、绘制宽度'
      code={`
        <ReactCanvasProcess
          percentage={80}
          width={40}
          fontSize={2}
          lineWidth={0.8}
          startAngle={4 / 5 * Math.PI}
          endAngle={1 / 5 * Math.PI}
        />
      `}
    >
      <ReactCanvasProcess
        percentage={80}
        width={40}
        fontSize={2}
        lineWidth={0.8}
        startAngle={4 / 5 * Math.PI}
        endAngle={1 / 5 * Math.PI}
      />
    </Example>

    <Example
      title='自定义背景色、进度条颜色、字体颜色'
      code={`
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
      `}
    >
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
  </div>

  <div className='col-6 pl-3 pr-3 pt-3 pb-5'>
    <Example
      title='使用生命周期回调函数'
      code={`
        <ReactCanvasProcess
          percentage={65}
          onAnimationStart={() => console.info('Animation Start🏁')}
          onAnimationEnd={() => console.info('Animation End✋')}
        />
      `}
    >
      <ReactCanvasProcess
        percentage={65}
        onAnimationStart={() => console.info('Animation Start🏁')}
        onAnimationEnd={() => console.info('Animation End✋')}
      />
    </Example>

    <Example
      title='使用px单位自定义进度条弧度、字体大小、宽度、绘制宽度'
      code={`
        <ReactCanvasProcess
          unit='px'
          percentage={50}
          width={480}
          fontSize={24}
          lineWidth={10}
          startAngle={4 / 5 * Math.PI}
          endAngle={1 / 5 * Math.PI}
        />
      `}
    >
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

    <Example
      title='动态变化百分比'
      code={`
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

        <ReactCanvasProcess percentage={percentage} />
        <button onClick={handleIncreasePercentage}>增加</button>
        <button onClick={handleDecreasePercentage}>减少</button>
      `}
    >
      <ReactCanvasProcess percentage={percentage} />
      <div className='row'>
        <button className='btn btn-primary mr-5' onClick={handleIncreasePercentage}>增加</button>
        <button className='btn btn-secondary' onClick={handleDecreasePercentage}>减少</button>
      </div>
    </Example>

    <Example
      title='自定义展示文字'
      code={`
      <ReactCanvasProcess
        progressColor='#ffaa00'
        text='当前进度：86%'
        fontSize={2}
        percentage={86}
        lineWidth={0.8}
        startAngle={Math.PI / 2}
        endAngle={Math.PI / 2}
      />
      `}
    >
      <ReactCanvasProcess
        progressColor='#ffaa00'
        text='当前进度：86%'
        fontSize={2}
        percentage={86}
        lineWidth={0.8}
        startAngle={Math.PI / 2}
        endAngle={Math.PI / 2}
      />
    </Example>
  </div>
</main>;
};

export { Main };
