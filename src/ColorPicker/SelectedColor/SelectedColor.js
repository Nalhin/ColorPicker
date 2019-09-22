import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colorArrayToRgba } from '../Utils';
import { SELECTED_COLOR_SIZE } from '../constants';

const Background = styled.div`
  width: ${SELECTED_COLOR_SIZE}px;
  height: ${SELECTED_COLOR_SIZE}px;
  border-radius: 50%;
`;

const SelectedColor = ({ color }) => {
  return <Background style={{ background: colorArrayToRgba(color) }} />;
};

SelectedColor.propTypes = {
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SelectedColor;
