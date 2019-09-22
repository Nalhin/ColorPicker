import React from 'react';
import { render } from '@testing-library/react';
import SliderHandle from './SliderHandle';

describe('Slider Handle', () => {
  // toHaveStyles doesn't work with rgba values
  const props = {
    color: [140, 150, 22, 1],
    position: { x: 40, y: 50 },
    children: <div />,
    click: () => {},
  };

  it('Should render correctly', () => {
    const { container } = render(
      <SliderHandle {...props}>
        <div />
      </SliderHandle>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // it('Should change background color', () => {
  //   const color = 'rgb(140, 150, 22, 1)';
  //   const { container } = render(
  //     <SliderHandle {...props}>
  //       <div />
  //     </SliderHandle>,
  //   );
  //   expect(container.firstChild).toHaveStyle(`background: ${color}`);
  // });

  // it('Should change position', () => {
  //   const position = { x: 50, y: 100 };
  //   const { container } = render(
  //     <ColorSelector position={position}>
  //       <div />
  //     </ColorSelector>,
  //   );
  //   expect(container.firstChild).toHaveStyle(
  //     `left: ${position.x - 7}px, top: ${position.y}px`,
  //   );
  // });
});
