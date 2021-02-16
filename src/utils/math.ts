export const { PI, round, min, max, abs } = Math;

export const EPSILON = 0.00001;

export const equal = (a: number, b: number) => abs(a - b) <= EPSILON;

export const computeCos = (
  startAngle: number,
  endAngle: number,
) => Math.cos((endAngle - startAngle) / 2);
