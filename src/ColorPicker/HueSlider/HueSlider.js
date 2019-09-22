import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SELECTOR_HEIGHT, SELECTED_SLIDER } from '../constants';
import ColorSelector from '../SliderHandle';

const Background = styled.div`
  display: inline-block;
  height: 10px;
  border-radius: 4px;
  width: 100%;
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  );
`;

const HueSlider = ({
  selected,
  changeSelected,
  hueRef,
  hueColor,
  huePosition,
  changeHuePosition,
}) => {
  const getPosition = React.useCallback(
    event => {
      const slider = hueRef.current;
      const rect = slider.getBoundingClientRect();
      const x = Math.floor(
        (event.clientX !== undefined
          ? event.clientX
          : event.touches[0].clientX) - rect.left,
      );
      if (x <= 0) changeHuePosition({ x: 0, y: SELECTOR_HEIGHT });
      else if (x >= slider.offsetWidth)
        changeHuePosition({ x: slider.offsetWidth, y: SELECTOR_HEIGHT });
      else changeHuePosition({ x, y: SELECTOR_HEIGHT });
    },
    [changeHuePosition, hueRef],
  );

  const getPositionMove = React.useCallback(
    event => {
      event.preventDefault();
      if (selected === SELECTED_SLIDER.HUE) {
        getPosition(event);
      }
    },
    [getPosition, selected],
  );

  const getPositionClick = event => {
    getPosition(event);
    changeSelected(SELECTED_SLIDER.HUE);
  };

  React.useEffect(() => {
    if (selected === SELECTED_SLIDER.HUE) {
      window.addEventListener('mousemove', getPositionMove);
      window.addEventListener('touchmove', getPositionMove);
    } else {
      window.removeEventListener('mousemove', getPositionMove);
      window.removeEventListener('touchmove', getPositionMove);
    }
    return () => {
      window.removeEventListener('mousemove', getPositionMove);
      window.removeEventListener('touchmove', getPositionMove);
    };
  }, [selected, getPositionMove]);

  return (
    <div>
      <ColorSelector
        color={hueColor}
        position={huePosition}
        click={getPositionClick}
      >
        <Background ref={hueRef} />
      </ColorSelector>
    </div>
  );
};

HueSlider.propTypes = {
  hueColor: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number.isRequired,
  changeSelected: PropTypes.func.isRequired,
  hueRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  huePosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  changeHuePosition: PropTypes.func.isRequired,
};

export default HueSlider;
