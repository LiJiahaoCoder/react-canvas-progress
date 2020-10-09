export const { PI, round } = Math;

export const computeCos = (startAngle: number, endAngle: number) => Math.cos((endAngle - startAngle) / 2);

export const computeRadius = (width: number, height: number, cos: number) => {
  return 0.9 * Math.min(width, height) / (1 + cos);
};

export const computeHeight = (height: number, r: number, startAngle: number, endAngle: number) => {
  const cos = computeCos(startAngle, endAngle);

  return endAngle - startAngle > PI ? 0.95 * height : 0.95 * height - r * cos;
};

export const computeCurrentPercentage = (percentage: number, current: number, speed: number) => {
  speed = speed / 100;
  current += speed;
  const _percentage = Math.min(percentage / 100, 1.0);
  const _current = Math.min(current, 1.0);

  return Math.min(_current, _percentage);
};

export const computeCurrentAngle = (
  startAngle: number,
  endAngle: number,
  currentProcess: number,
) => startAngle + (2 * PI - startAngle + endAngle) * currentProcess;

export const vwToPx = (vw: number) => vw * window.innerWidth / 100;
