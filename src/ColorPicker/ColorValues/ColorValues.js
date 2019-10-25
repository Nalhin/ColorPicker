import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { convertRgbaToHex } from '../Utils';

const StyledTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 12px;
`;

const StyledTable = styled.table`
  margin: 6px auto;
  width: 100%;
  table-layout: fixed;
`;

const StyledTd = styled.td`
  padding: 0 12px;
  width: 80px;
  text-align: center;
  user-select: text;
`;

const ColorValues = ({ color }) => {
  const colorArray = [...color.slice(0, 3), Math.round(color[3] * 255)];

  return (
    <div>
      <StyledTitle>Selected Color</StyledTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>RGBA</th>
            <th>HEX</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTd>{colorArray.join(',')}</StyledTd>
            <StyledTd>{convertRgbaToHex(colorArray)}</StyledTd>
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
};

ColorValues.propTypes = {
  color: PropTypes.arrayOf(PropTypes.number),
};

export default ColorValues;
