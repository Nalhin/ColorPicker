import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ColorSelector from '../SliderHandle';
import { SELECTOR_HEIGHT, SELECTED_SLIDER } from '../constants';
import { colorArrayToRgba } from '../Utils';

const Background = styled.div`
  display: inline-block;
  height: 10px;
  border-radius: 4px;
  width: 100%;
`;

const Wrapper = styled.div`
  margin-top: 5px;
`;

const AlphaSlider = ({
  changeSelected,
  selected,
  alphaRef,
  alphaColor,
  alphaPosition,
  changeAlphaPosition,
  satLightColor,
}) => {
  const getColor = React.useCallback(
    event => {
      const slider = alphaRef.current;
      const rect = slider.getBoundingClientRect();
      const x = Math.floor(
        (event.clientX !== undefined
          ? event.clientX
          : event.touches[0].clientX) - rect.left,
      );

      if (x <= 0) changeAlphaPosition({ x: 0, y: SELECTOR_HEIGHT });
      else if (x >= slider.offsetWidth)
        changeAlphaPosition({ x: slider.offsetWidth, y: SELECTOR_HEIGHT });
      else changeAlphaPosition({ x, y: SELECTOR_HEIGHT });
    },
    [alphaRef, changeAlphaPosition],
  );

  const getPositionMove = React.useCallback(
    event => {
      event.preventDefault();
      if (selected === SELECTED_SLIDER.ALPHA) {
        getColor(event);
      }
    },
    [getColor, selected],
  );

  const getPositionClick = event => {
    event.preventDefault();
    getColor(event);
    changeSelected(SELECTED_SLIDER.ALPHA);
  };

  React.useEffect(() => {
    if (selected === SELECTED_SLIDER.ALPHA) {
      window.addEventListener('mousemove', getPositionMove);
      window.addEventListener('ontouchmove', getPositionMove);
    } else {
      window.removeEventListener('mousemove', getPositionMove);
      window.removeEventListener('ontouchmove', getPositionMove);
    }
    return () => {
      window.removeEventListener('mousemove', getPositionMove);
      window.removeEventListener('ontouchmove', getPositionMove);
    };
  }, [getPositionMove, selected]);

  return (
    <Wrapper>
      <ColorSelector
        color={alphaColor}
        position={alphaPosition}
        click={getPositionClick}
      >
        <Background
          style={{
            height: '10px',
            background: `linear-gradient(90deg,rgba(0, 0, 0, 0), ${colorArrayToRgba(
              satLightColor,
            )}) `,
          }}
          ref={alphaRef}
        />
      </ColorSelector>
    </Wrapper>
  );
};

AlphaSlider.propTypes = {
  changeSelected: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  alphaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  alphaColor: PropTypes.arrayOf(PropTypes.number).isRequired,
  alphaPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  changeAlphaPosition: PropTypes.func.isRequired,
  satLightColor: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default AlphaSlider;
