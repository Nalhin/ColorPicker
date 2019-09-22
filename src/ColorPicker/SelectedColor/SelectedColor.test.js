import React from 'react';
import { render } from '@testing-library/react';
import SelectedColor from './SelectedColor';

describe('Selected Color', () => {
  // toHaveStyles doesn't work with rgba values

  it('Should render correctly', () => {
    const color = [255, 240, 220, 1];
    const { container } = render(<SelectedColor color={color} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // it('Should change background color', () => {
  //   const color = 'rgb(140, 52, 30)';
  //   const { container } = render(<SelectedColor color={color} />);

  //   expect(container).toHaveStyleRule('background', color);
  // });

  // it('Should render with default color', () => {
  //   const defaultColor = 'rgb(0, 0, 0)';
  //   const { container } = render(<SelectedColor />);
  //   expect(container).toHaveStyleRule(`background: ${defaultColor}`);
  // });
});
