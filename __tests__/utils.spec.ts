import {
  equal,
  computeCos,
  computeRadius,
  computeHeight,
  computeCurrentPercentage,
  computeCurrentAngle,
  vwToPx,
} from '../src/utils';

describe('Utils file test', () => {
  it('should get equal when call equal, given 1.0 and 1.00000001', () => {
    const isEqual = equal(1.0, 1.00000001);

    expect(isEqual).toBeTruthy();
  });

  it('should get not equal when call equal, given 1.0 and 1.0001', () => {
    const isEqual = equal(1.0, 1.0001);

    expect(isEqual).toBeFalsy();
  });

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

  it('should get current percentage when call computeCurrentPercentage, given curren and percentage is equal', () => {
    const current = 0.8;
    const percentage = 80;
    const result = computeCurrentPercentage(percentage, current, 1);

    expect(result).toBe(current);
  });

  it(
    'should get correct percentage when call computeCurrentPercentage, given current is greater then percentage',
    () => {
      const current = 0.8;
      const percentage = 70;
      const result = computeCurrentPercentage(percentage, current, 1);

      expect(result).toBe(0.79);
    },
  );

  it('should get correct angle when call computeCurrentAngle', () => {
    const angle = computeCurrentAngle(0, Math.PI, 0.5);

    expect(angle).toBe(3 * Math.PI / 2);
  });

  it('should get correct px value when call vwToPx', () => {
    const px = vwToPx(20);

    expect(px).toBe(200);
  });
});
