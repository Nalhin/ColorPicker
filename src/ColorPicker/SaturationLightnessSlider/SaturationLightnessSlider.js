import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ColorSelector from '../SliderHandle';
import { SELECTED_SLIDER, SELECTOR_SIZE } from '../constants';
import { checkBoundaries, colorArrayToRgba } from '../Utils';

const Background = styled.div`
  height: 200px;
  display: block;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
`;

const SaturationLightnessSlider = ({
  hueColor,
  selected,
  changeSelected,
  changeSatLightPosition,
  satLightRef,
  satLightColor,
  satLightPosition,
}) => {
  const setPosition = React.useCallback(
    event => {
      const satLight = satLightRef.current;
      const rect = satLight.getBoundingClientRect();
      const newX = Math.floor(
        (event.clientX !== undefined
          ? event.clientX
          : event.touches[0].clientX) - rect.left,
      );
      const newY = Math.floor(
        (event.clientY !== undefined
          ? event.clientY
          : event.touches[0].clientY) - rect.top,
      );
      const SCOPE = Object.freeze({
        X_MIN: 0,
        X_MAX: satLight.offsetWidth,
        Y_MIN: 0,
        Y_MAX: satLight.offsetHeight,
      });
      const [x, y] = checkBoundaries(newX, newY, SCOPE);
      changeSatLightPosition({ x, y: y - SELECTOR_SIZE / 2 });
    },
    [changeSatLightPosition, satLightRef],
  );

  const getPositionMove = React.useCallback(
    event => {
      event.preventDefault();
      if (selected === SELECTED_SLIDER.SATURATION_LIGHTNESS) {
        setPosition(event);
      }
    },
    [selected, setPosition],
  );

  const getPositionClick = event => {
    event.preventDefault();
    setPosition(event);
    changeSelected(SELECTED_SLIDER.SATURATION_LIGHTNESS);
  };

  React.useEffect(() => {
    if (selected === SELECTED_SLIDER.SATURATION_LIGHTNESS)
      window.addEventListener('mousemove', getPositionMove);
    else window.removeEventListener('mousemove', getPositionMove);
    return () => {
      window.removeEventListener('mousemove', getPositionMove);
    };
  }, [getPositionMove, selected]);

  return (
    <div>
      <ColorSelector
        color={satLightColor}
        position={satLightPosition}
        click={getPositionClick}
      >
        <Background
          ref={satLightRef}
          style={{
            backgroundColor: colorArrayToRgba(hueColor),
          }}
        />
      </ColorSelector>
    </div>
  );
};

SaturationLightnessSlider.propTypes = {
  hueColor: PropTypes.arrayOf(PropTypes.number).isRequired,
  satLightColor: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number.isRequired,
  changeSelected: PropTypes.func.isRequired,
  satLightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  changeSatLightPosition: PropTypes.func.isRequired,
  satLightPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default SaturationLightnessSlider;
