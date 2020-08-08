import {
  computeCos,
  computeRadius,
  computeHeight,
  computeCurrentPercentage,
  computeCurrentAngle,
  vwToPx,
} from '../src/utils';

describe('Utils file test', () => {
  it('should get correct cos when call computeCos', () => {
    const cos = computeCos(0, 2 * Math.PI);

    expect(cos).toBe(-1);
  });

  it('should get correct radius when call computeRadius', () => {
    const radius = computeRadius(40, 40, 1);

    expect(radius).toBe(18);
  });

  it('should get correct height when call computeHeight, given the difference between endAngle and startAngle is greater than PI', () => {
    const height = computeHeight(40, 10, 0, 2 * Math.PI);

    expect(height).toBe(38);
  });

  it('should get correct height when call computeHeight, given the difference between endAngle and startAngle is less than PI', () => {
    const height = computeHeight(40, 10, 0, Math.PI);

    expect(height).toBe(38);
  });

  it('should get correct percentage when call computeCurrentPercentage', () => {
    const percentage = computeCurrentPercentage(100, 0, 1);

    expect(percentage).toBe(0.01);
  });

  it('should get correct angle when call computeCurrentAngle', () => {
    const angle = computeCurrentAngle(0, Math.PI, 0.5);

    expect(angle).toBe(3 * Math.PI / 2);
  });

  it('should get correct px value when call vwToPx', () => {
    const px = vwToPx(20);

    expect(px).toBe(200);
  });
});
