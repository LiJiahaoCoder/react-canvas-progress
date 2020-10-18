export const { PI, round, min, max, abs } = Math;

export const EPCILON = 0.00001;

export const equal = (a: number, b: number) => abs(a - b) <= EPCILON;

export const computeCos = (
  startAngle: number,
  endAngle: number,
) => Math.cos((endAngle - startAngle) / 2);

export const computeRadius = (
  width: number,
  height: number,
  lineWidth: number,
  cos: number,
) => 0.9 * min(width, height) / (1 + cos) - lineWidth;

export const computeHeight = (
  height: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const cos = computeCos(startAngle, endAngle);
  const actualHeight = 0.95 * height;

  return endAngle - startAngle > PI ? actualHeight : actualHeight - r * cos;
};

export const computeCurrentPercentage = (
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

export const computeCurrentAngle = (
  startAngle: number,
  endAngle: number,
  currentPercentage: number,
) => startAngle + (2 * PI - startAngle + endAngle) * currentPercentage;

export const vwToPx = (vw: number) => vw * window.innerWidth / 100;

export const noop = Function.prototype;
