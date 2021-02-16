import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import { useCache } from './hooks/useCache';
import {
  noop,
  vwToPx,
  getX,
  getY,
  getRadius,
  getWidth,
  getHeight,
  getCurrentAngle,
  getCurrentPercentage,
  cancelAnimationFrame,
  requestAnimationFrame,
} from './utils';
import {
  round,
  equal,
  computeCos,
} from './utils/math';
import DEFAULT from './default';
import { Unit, ReactCanvasProcessorProps } from './type';

const ReactCanvasProcessor: React.FC<ReactCanvasProcessorProps> = ({
  text: pText,
  height: cHeight,
  style,
  className,
  percentage,
  unit = DEFAULT.unit as Unit,
  width: cWidth = DEFAULT.width,
  startAngle = DEFAULT.startAngle,
  endAngle = DEFAULT.endAngle,
  speed = DEFAULT.speed,
  animation = DEFAULT.animation,
  font = DEFAULT.font,
  fontSize: pFontSize = DEFAULT.fontSize,
  fontColor = DEFAULT.fontColor,
  bgColor = DEFAULT.bgColor,
  lineWidth: pLineWidth = DEFAULT.lineWidth,
  progressColor = DEFAULT.progressColor,
  withBaseProgressColor = DEFAULT.withBaseProgressColor,
  baseProgressColor = DEFAULT.baseProgressColor,
  onAnimationStart = noop,
  onAnimationEnd = noop,
}) => {
  let currentPercentage!: number;
  let ctx: CanvasRenderingContext2D;

  const [cache, setCache] = useCache<ReactCanvasProcessorProps>({ percentage: 0 });
  const [handler, setHandler] = useState(-1);
  const cos = computeCos(startAngle, endAngle);
  const canvas = useRef<HTMLCanvasElement>(null);

  const width = getWidth(unit, cWidth);
  const height = getHeight(unit, cHeight, cWidth);
  const lineWidth = round(unit === 'px' ? pLineWidth : vwToPx(pLineWidth));
  const radius = getRadius(
    width,
    height,
    lineWidth,
    cos,
  );
  const x = getX(width);
  const y = getY(
    height,
    radius,
    startAngle,
    endAngle,
  );
  const isEnd = equal(percentage, currentPercentage * 100) ||
      (percentage >= 100 && currentPercentage >= 1);

  useEffect(() => {
    onAnimationStart();
  }, []);

  useEffect(() => {
    animate();
  }, [percentage]);

  const animate = () => {
    ctx = canvas.current!.getContext('2d')!;
    ctx.save();
    currentPercentage = cache.percentage;
    draw();
  };

  const draw = () => {
    clear();

    fillBackground();
    drawBaseProgress();
    drawProgress();
    drawText();

    if (isEnd) {
      cancelAnimationFrame(handler);
      onAnimationEnd();

      return setHandler(-1);
    }

    setHandler(requestAnimationFrame(draw));
  };

  const clear = () => {
    ctx.clearRect(0, 0, width, height);
  };

  const fillBackground = () => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  const strokeArc = (angle: number, color: string) => {
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(x, y, radius, startAngle, angle);
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
  };

  const drawBaseProgress = () => {
    if (!withBaseProgressColor) return;

    strokeArc(endAngle, baseProgressColor);
  };

  const drawProgress = () => {
    currentPercentage = getCurrentPercentage(
      percentage,
      animation ? currentPercentage : percentage,
      speed,
    );
    setCache({ percentage: currentPercentage });

    strokeArc(
      getCurrentAngle(startAngle, endAngle, currentPercentage),
      progressColor,
    );
  };

  const drawText = () => {
    const fontSize = unit === 'px' ? pFontSize : vwToPx(pFontSize);
    const text = pText || `${Number(currentPercentage * 100).toFixed(2)}%`;
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  };

  return <div className={className} style={style}>
    <canvas
      ref={canvas}
      width={width}
      height={height}
    />
  </div>;
};

export default ReactCanvasProcessor;
