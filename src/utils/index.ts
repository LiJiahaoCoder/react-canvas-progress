export const { PI, round, min, max, abs } = Math;

export const EPCILON = 0.00001;

export const equal = (a: number, b: number): boolean => abs(a - b) <= EPCILON;

export const computeCos = (startAngle: number, endAngle: number) => Math.cos((endAngle - startAngle) / 2);

export const computeRadius = (width: number, height: number, lineWidth: number, cos: number) => {
  return 0.9 * min(width, height) / (1 + cos) - lineWidth;
};

export const computeHeight = (height: number, r: number, startAngle: number, endAngle: number) => {
  const cos = computeCos(startAngle, endAngle);

  return endAngle - startAngle > PI ? 0.95 * height : 0.95 * height - r * cos;
};

export const computeCurrentPercentage = (percentage: number, current: number, speed: number) => {
  const currentOfHundred = current * 100;
  if (equal(percentage, currentOfHundred)) return current;

  speed = speed / 100;
  current = percentage > currentOfHundred ? current + speed : current - speed;
  const _percentage = min(percentage / 100, 1.0);
  const _current = min(current, 1.0);

  return percentage > currentOfHundred ? min(_current, _percentage) : max(_current, _percentage);
};

export const computeCurrentAngle = (
  startAngle: number,
  endAngle: number,
  currentProcess: number,
) => startAngle + (2 * PI - startAngle + endAngle) * currentProcess;

export const vwToPx = (vw: number) => vw * window.innerWidth / 100;

export const noop = Function.prototype;
