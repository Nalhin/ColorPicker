import React from 'react';
import { render } from '@testing-library/react';

import AlphaSlider from './AlphaSlider';

describe('Alpha Slider ', () => {
  const props = {
    selected: 1,
    changeSelected: () => {},
    alphaRef: () => {},
    alphaColor: [255, 240, 220, 1],
    alphaPosition: { x: 40, y: 50 },
    changeAlphaPosition: () => {},
    satLightColor: [255, 240, 220, 1],
  };
  it('Should render correctly', () => {
    const { container } = render(<AlphaSlider {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
