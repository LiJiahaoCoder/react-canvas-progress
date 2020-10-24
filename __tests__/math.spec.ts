import {
  equal,
  computeCos,
} from '../src/utils/math';

describe('Math file test', () => {
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

});
