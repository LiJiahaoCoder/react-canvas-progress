import React, { useRef, useEffect, useState } from 'react';
import { useCache } from './hooks/useCache';
import {
  equal,
  round,
  vwToPx,
  computeCos,
  computeCurrentPercentage,
  computeCurrentAngle,
  computeHeight,
  computeRadius,
} from './utils';
import Default from './default';

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;

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
  text,
  height,
  style,
  className,
  percentage,
  unit = Default.unit,
  width = Default.width,
  startAngle = Default.startAngle,
  endAngle = Default.endAngle,
  speed = Default.speed,
  animation = Default.animation,
  font = Default.font,
  fontSize = Default.fontSize,
  fontColor = Default.fontColor,
  bgColor = Default.bgColor,
  lineWidth = Default.lineWidth,
  progressColor = Default.progressColor,
  withBaseProgressColor = Default.withBaseProgressColor,
  baseProgressColor = Default.baseProgressColor,
}) => {
  let ctx: CanvasRenderingContext2D;
  let currentPercentage = 0;

  const { cache, setCache } = useCache();
  const [ handler, setHandler ] = useState(-1);
  const cos = computeCos(startAngle, endAngle);
  const canvas = useRef<HTMLCanvasElement>(null);

  const _width = round(unit === 'px' ? width : vwToPx(width));
  const _height = round(
    unit === 'px' ?
    height || width / Default.ratio :
    height ? vwToPx(height) : vwToPx(width) / Default.ratio,
  );
  const _lineWidth = round(unit === 'px' ? lineWidth : vwToPx(lineWidth));
  const _radius = computeRadius(_width, _height, cos);
  const _x = _width / 2;
  const _y = computeHeight(_height, _radius, startAngle, endAngle);

  useEffect(() => {
    ctx = canvas.current!.getContext('2d')!;
    ctx.save();
    draw();
    currentPercentage = cache.percentage;
  }, [percentage]);

  const draw = () => {
    clear();

    fillBackground();
    drawBaseProgress();
    drawProgress();
    showText();

    if (equal(percentage, currentPercentage * 100)) {
      return cancelAnimationFrame(handler);
    }

    setHandler(requestAnimationFrame(draw));
  };

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
    currentPercentage = computeCurrentPercentage(
      percentage,
      animation ? currentPercentage : percentage,
      speed,
    );
    setCache({ percentage: currentPercentage });

    strokeArc(
      computeCurrentAngle(startAngle, endAngle, currentPercentage),
      progressColor,
    );
  };

  const showText = () => {
    const _fontSize = unit === 'px' ? fontSize : vwToPx(fontSize);
    const _text = text || `${Number(currentPercentage * 100).toFixed(2)}%`;
    ctx.font = `${_fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(_text, _x, _y);
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
