import React from 'react';
import { render } from '@testing-library/react';
import SaturationLightnessSlider from './SaturationLightnessSlider';

describe('SaturationLightnessSlider', () => {
  const props = {
    hueColor: [255, 240, 220, 1],
    selected: 0,
    changeSelected: () => {},
    changeSatLightPosition: () => {},
    satLightRef: () => {},
    satLightColor: [255, 240, 220, 1],
    satLightPosition: { x: 40, y: 50 },
  };

  it('Should render correctly', () => {
    const { container } = render(<SaturationLightnessSlider {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
