import React, { useRef, useEffect } from 'react';
import {
  round,
  vwToPx,
  computeCurrentPercentage,
  computeCurrentAngle,
  computeCos,
  computeRadius,
  computeHeight,
} from './utils';

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;
const Default = {
  type: 'arc',
  startAngle: Math.PI,
  endAngle: 0,
  unit: 'vw',
  width: 100,
  speed: 1,
  animation: true,
  lineWidth: 1,
  bgColor: '#fff',
  font: 'serif',
  fontColor: '#468af6',
  fontSize: 8,
  withBaseProgressColor: true,
  baseProgressColor: '#ddd',
  progressColor: '#468af6',
  ratio: 2, // width / height
};

export interface Props {
  percentage: number;
  text?: string;
  font?: string;
  fontSize?: number;
  fontColor?: string;
  withBaseProgressColor?: boolean;
  baseProgressColor?: string;
  progressColor?: string;
  startAngle?: number;
  endAngle?: number;
  speed?: number;
  animation?: boolean;
  width?: number;
  height?: number;
  lineWidth?: number;
  unit?: 'px' | 'vw';
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

const ReactCanvasProcessor: React.FC<Props> = ({
  percentage,
  unit = Default.unit,
  height,
  width = Default.width,
  startAngle = Default.startAngle,
  endAngle = Default.endAngle,
  speed = Default.speed,
  animation = Default.animation,
  text,
  font = Default.font,
  fontSize = Default.fontSize,
  fontColor = Default.fontColor,
  bgColor = Default.bgColor,
  lineWidth = Default.lineWidth,
  progressColor = Default.progressColor,
  withBaseProgressColor = Default.withBaseProgressColor,
  baseProgressColor = Default.baseProgressColor,
  style,
  className,
}) => {
  let ctx: CanvasRenderingContext2D;
  const canvas = useRef<HTMLCanvasElement>(null);
  const _width = round(unit === 'px' ? width : vwToPx(width));
  const _height = round(
    unit === 'px' ?
    height || width / Default.ratio :
    height ? vwToPx(height) : vwToPx(width) / Default.ratio,
  );
  const _lineWidth = round(unit === 'px' ? lineWidth : vwToPx(lineWidth));
  const cos = computeCos(startAngle, endAngle);
  const _radius = computeRadius(_width, _height, cos);
  const _x = _width / 2;
  const _y = computeHeight(_height, _radius, startAngle, endAngle);
  let _currentPercentage = 0;

  useEffect(() => {
    ctx = canvas.current!.getContext('2d')!;
    ctx.save();
    draw();
  }, []);

  useEffect(() => {
    ctx = canvas.current!.getContext('2d')!;
    ctx.save();
    draw();
  }, [percentage]);

  const clear = () => {
    ctx.clearRect(0, 0, _width, _height);
  };

  const fillBackground = () => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, _width, _height);
    ctx.restore();
  };

  const strokeArc = (angle: number, color: string) => {
    ctx.beginPath();
    ctx.lineWidth = _lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(_x, _y, _radius, startAngle, angle);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const drawBaseProgress = () => {
    if (!withBaseProgressColor) return;

    strokeArc(endAngle, baseProgressColor);
  };

  const drawProgress = () => {
    _currentPercentage = computeCurrentPercentage(
      percentage,
      animation ? _currentPercentage : percentage,
      speed,
    );
    const _currentAngle = computeCurrentAngle(startAngle, endAngle, _currentPercentage);

    strokeArc(_currentAngle, progressColor);
  };

  const showText = () => {
    const _fontSize = unit === 'px' ? fontSize : vwToPx(fontSize);
    const _text = text || `${Number(_currentPercentage * 100).toFixed(2)}%`;
    ctx.font = `${_fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(_text, _x, _y);
  };

  const draw = () => {
    clear();
    fillBackground();
    drawBaseProgress();
    drawProgress();
    showText();
    if (_currentPercentage === percentage) return;
    requestAnimationFrame(draw);
  };

  return <div className={className} style={style}>
    <canvas
      ref={canvas}
      width={_width}
      height={_height}
    ></canvas>
  </div>;
};

export default ReactCanvasProcessor;
