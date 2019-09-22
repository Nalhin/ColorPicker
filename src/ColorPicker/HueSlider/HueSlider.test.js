import React from 'react';
import { render } from '@testing-library/react';

import HueSlider from './HueSlider';

describe('Hue Slider ', () => {
  const props = {
    selected: 1,
    changeSelected: () => {},
    hueRef: () => {},
    hueColor: [255, 240, 220, 1],
    huePosition: { x: 40, y: 50 },
    changeHuePosition: () => {},
  };
  it('Should render correctly', () => {
    const { container } = render(<HueSlider {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
