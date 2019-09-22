import {
  colorArrayToRgba,
  convertHslToRgb,
  checkBoundaries,
  positionToValue,
  calculateSatLightColor,
  mixTwoColors,
  convertRgbaToHex,
} from './Utils';

describe('mixTwoColors', () => {
  it('Should mix two colors correctly', () => {
    const firstColor = [170, 123, 22, 0.7];
    const secondColor = [120, 13, 22, 0.6];
    expect(mixTwoColors(firstColor, secondColor)).toStrictEqual([
      136,
      48,
      22,
      0.88,
    ]);
  });
});

describe('calculateSatLightColor', () => {
  it('Should return black color in bottom left corner', () => {
    const color = [170, 123, 22, 1];
    const blackOpacity = 1;
    const whiteOpacity = 1;
    expect(
      calculateSatLightColor(color, blackOpacity, whiteOpacity),
    ).toStrictEqual([0, 0, 0, 1]);
  });
  it('Should return white color in top left corner', () => {
    const color = [170, 123, 22, 1];
    const blackOpacity = 0;
    const whiteOpacity = 1;
    expect(
      calculateSatLightColor(color, blackOpacity, whiteOpacity),
    ).toStrictEqual([255, 255, 255, 1]);
  });

  it('Should return normal color in top right corner', () => {
    const color = [170, 123, 22, 1];
    const blackOpacity = 0;
    const whiteOpacity = 0;
    expect(
      calculateSatLightColor(color, blackOpacity, whiteOpacity),
    ).toStrictEqual([170, 123, 22, 1]);
  });
  it('Should return black color in bottom right corner', () => {
    const color = [170, 123, 22];
    const blackOpacity = 1;
    const whiteOpacity = 0;
    expect(
      calculateSatLightColor(color, blackOpacity, whiteOpacity),
    ).toStrictEqual([0, 0, 0, 1]);
  });
});

describe('positionToValue', () => {
  it('Should convert position to value', () => {
    const minValue = 20;
    const maxValue = 120;
    const position = 55;
    const width = 220;
    expect(positionToValue(minValue, maxValue, position, width)).toBe(25);
  });
});

describe('convertHslToRgb', () => {
  it('Should convert hsl to rgb', () => {
    const [h, s, l] = [160, 1, 0.5];
    expect(convertHslToRgb(h, s, l)).toEqual([0, 255, 170, 1]);
  });
});

describe('convertRgbaToHex', () => {
  it('Should convert color array to hex', () => {
    const color = [4, 255, 15, 255];
    expect(convertRgbaToHex(color)).toBe('#04ff0fff');
  });
});

describe('colorArrayToRgba', () => {
  it('Should convert color array to rgb', () => {
    const color = [4, 255, 15, 255];
    expect(colorArrayToRgba(color)).toBe('rgba(4,255,15,255)');
  });
});

describe('checkBoundaries', () => {
  const SCOPE = Object.freeze({
    X_MIN: 0,
    X_MAX: 200,
    Y_MIN: 0,
    Y_MAX: 200,
  });
  it('Should return normal value with x min', () => {
    expect(checkBoundaries(0, 20, SCOPE)).toStrictEqual([0, 20]);
  });
  it('Should return normal value with x max', () => {
    expect(checkBoundaries(200, 20, SCOPE)).toStrictEqual([200, 20]);
  });
  it('Should return normal value with y min', () => {
    expect(checkBoundaries(20, 0, SCOPE)).toStrictEqual([20, 0]);
  });
  it('Should return normal value with y max', () => {
    expect(checkBoundaries(20, 200, SCOPE)).toStrictEqual([20, 200]);
  });
  it('Should return normal value with x and y max', () => {
    expect(checkBoundaries(200, 200, SCOPE)).toStrictEqual([200, 200]);
  });
  it('Should return normal value with x and y min', () => {
    expect(checkBoundaries(0, 0, SCOPE)).toStrictEqual([0, 0]);
  });
  it('Should return normal value with x under scope', () => {
    expect(checkBoundaries(-20, 20, SCOPE)).toStrictEqual([0, 20]);
  });
  it('Should return normal value with x over scope', () => {
    expect(checkBoundaries(220, 20, SCOPE)).toStrictEqual([200, 20]);
  });
  it('Should return normal value with y under scope', () => {
    expect(checkBoundaries(20, -20, SCOPE)).toStrictEqual([20, 0]);
  });
  it('Should return normal value with y over scope', () => {
    expect(checkBoundaries(20, 220, SCOPE)).toStrictEqual([20, 200]);
  });
  it('Should return normal value with x and y over scope', () => {
    expect(checkBoundaries(220, 220, SCOPE)).toStrictEqual([200, 200]);
  });
  it('Should return normal value with x and y under scope', () => {
    expect(checkBoundaries(-20, -20, SCOPE)).toStrictEqual([0, 0]);
  });
});
