import DEFAULT from '../default';
import {
  PI,
  abs,
  min,
  max,
  round,
  equal,
  computeCos,
} from './math';
import { Unit } from '../type';

export const noop = Function.prototype;

export const cancelAnimationFrame = window.cancelAnimationFrame;

export const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

export const vwToPx = (vw: number) => vw * window.innerWidth / 100;

export const getX = (width: number) => width / 2;

export const getY = (
  height: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const cos = computeCos(startAngle, endAngle);
  const actualHeight = 0.95 * height;

  return endAngle - startAngle > PI ? actualHeight : actualHeight - radius * cos;
};

export const getWidth = (
  unit: Unit,
  width: number,
) => round(unit === 'px' ? width : vwToPx(width));

export const getHeight = (
  unit: string,
  height: number | undefined,
  width: number,
) =>  round(
  unit === 'px' ?
    height || width / DEFAULT.ratio :
    height ? vwToPx(height) : vwToPx(width) / DEFAULT.ratio,
);

export const getRadius = (
  width: number,
  height: number,
  lineWidth: number,
  cos: number,
) => 0.9 * min(width, height) / (1 + cos) - lineWidth;

export const getCurrentPercentage = (
  percentage: number,
  current: number,
  speed: number,
) => {
  const currentPercentageOfHundred = current * 100;
  if (equal(percentage, currentPercentageOfHundred)) return current;

  const isIncrease = percentage > currentPercentageOfHundred;
  speed = speed / 100;
  percentage = min(percentage / 100, 1.0);
  current = min(isIncrease ? current + speed : current - speed, 1.0);

  return isIncrease ? min(current, percentage) : max(current, percentage);
};

export const getCurrentAngle = (
  startAngle: number,
  endAngle: number,
  currentPercentage: number,
) => startAngle + (2 * PI - startAngle + endAngle) * currentPercentage;
