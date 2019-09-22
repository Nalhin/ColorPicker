export const colorArrayToRgba = array => {
  return `rgba(${array.join(',')})`;
};

export const convertRgbaToHex = rgbaArray => {
  return `#${rgbaArray
    .map(c => {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;
};

export const positionToValue = (minValue, maxValue, position, width) => {
  const positionPercentage = position / width;
  const valueDifference = maxValue - minValue;
  return valueDifference * positionPercentage;
};

// https://en.wikipedia.org/wiki/HSL_and_HSV
export const convertHslToRgb = (h, s = 1, l = 0.5) => {
  const f = n => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const value = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(value * 255);
  };

  return [f(0), f(8), f(4), 1];
};

export const checkBoundaries = (x, y, SCOPE) => {
  let retX = x;
  let retY = y;
  if (x < SCOPE.X_MIN) retX = SCOPE.X_MIN;
  else if (x > SCOPE.X_MAX) retX = SCOPE.X_MAX;

  if (y < SCOPE.Y_MIN) retY = SCOPE.Y_MIN;
  else if (y > SCOPE.Y_MAX) retY = SCOPE.Y_MAX;
  return [retX, retY];
};

/*
 mix two colors in rgba format [r,g,b,a]
*/
export const mixTwoColors = (firstColor, secondColor) => {
  if (!firstColor[3]) return secondColor;
  if (!secondColor[3]) return firstColor;
  const a = 1 - (1 - secondColor[3]) * (1 - firstColor[3]);

  const r = Math.round(
    (secondColor[0] * secondColor[3] +
      firstColor[0] * firstColor[3] * (1 - secondColor[3])) /
      a,
  );

  const g = Math.round(
    (secondColor[1] * secondColor[3] +
      firstColor[1] * firstColor[3] * (1 - secondColor[3])) /
      a,
  );

  const b = Math.round(
    (secondColor[2] * secondColor[3] +
      firstColor[2] * firstColor[3] * (1 - secondColor[3])) /
      a,
  );
  return [r, g, b, a];
};

export const calculateSatLightColor = (color, blackAlpha, whiteAlpha) => {
  if (blackAlpha || whiteAlpha) {
    const white = [255, 255, 255, whiteAlpha];
    const black = [0, 0, 0, blackAlpha];
    const blackWhiteMix = mixTwoColors(white, black);
    return mixTwoColors(color, blackWhiteMix);
  }

  return color;
};
