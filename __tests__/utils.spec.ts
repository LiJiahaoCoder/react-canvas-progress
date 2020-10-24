import {
  getRadius,
  getY,
  getCurrentPercentage,
  getCurrentAngle,
  vwToPx,
} from '../src/utils';

describe('Utils file test', () => {
  it('should get correct radius when call getRadius', () => {
    const radius = getRadius(40, 40, 2, 1);

    expect(radius).toBe(16);
  });

  it(
    'should get correct height when call getY, given the difference between endAngle and startAngle is greater than PI',
    () => {
      const height = getY(40, 10, 0, 2 * Math.PI);

      expect(height).toBe(38);
    },
  );

  it(
    'should get correct height when call getY, given the difference between endAngle and startAngle is less than PI',
    () => {
      const height = getY(40, 10, 0, Math.PI);

      expect(height).toBe(38);
    },
  );

  it('should get correct percentage when call getCurrentPercentage', () => {
    const percentage = getCurrentPercentage(100, 0, 1);

    expect(percentage).toBe(0.01);
  });

  it('should get current percentage when call getCurrentPercentage, given curren and percentage is equal', () => {
    const current = 0.8;
    const percentage = 80;
    const result = getCurrentPercentage(percentage, current, 1);

    expect(result).toBe(current);
  });

  it(
    'should get correct percentage when call getCurrentPercentage, given current is greater then percentage',
    () => {
      const current = 0.8;
      const percentage = 70;
      const result = getCurrentPercentage(percentage, current, 1);

      expect(result).toBe(0.79);
    },
  );

  it('should get correct angle when call getCurrentAngle', () => {
    const angle = getCurrentAngle(0, Math.PI, 0.5);

    expect(angle).toBe(3 * Math.PI / 2);
  });

  it('should get correct px value when call vwToPx', () => {
    const px = vwToPx(20);

    expect(px).toBe(200);
  });
});
