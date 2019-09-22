import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colorArrayToRgba } from '../Utils';
import { SELECTOR_SIZE } from '../constants';

const Wrapper = styled.div`
  position: relative;
  touch-action: none;
`;

const Handle = styled.div`
  position: absolute;
  width: ${SELECTOR_SIZE}px;
  height: 14px;
  border-radius: 50%;
  border: 2px #fff solid;
  &:hover {
    cursor: pointer;
  }
`;

const SliderHandle = ({ color, position, children, click }) => {
  return (
    <Wrapper onMouseDown={click} onTouchStart={click}>
      <Handle
        style={{
          top: `${position.y}px`,
          left: `${position.x - SELECTOR_SIZE / 2}px`,
          background: colorArrayToRgba(color),
        }}
      />
      {children}
    </Wrapper>
  );
};

SliderHandle.propTypes = {
  click: PropTypes.func.isRequired,
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.element.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default SliderHandle;
