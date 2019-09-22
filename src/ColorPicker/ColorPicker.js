import React from 'react';
import styled from '@emotion/styled';
import HueSlider from './HueSlider';
import SaturationLightnessSlider from './SaturationLightnessSlider';
import SelectedColor from './SelectedColor';
import AlphaSlider from './AlphaSlider';
import {
  SELECTED_COLOR_SIZE,
  SELECTED_SLIDER,
  SELECTOR_HEIGHT,
  SELECTOR_SIZE,
  PLACEHOLDER_COLOR,
} from './constants';
import {
  positionToValue,
  calculateSatLightColor,
  convertHslToRgb,
} from './Utils';
import ColorValues from './ColorValues';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
`;
const BottomWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;
const SlidersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${SELECTED_COLOR_SIZE}px);
  margin-left: 10px;
`;

const ColorPicker = () => {
  const [selected, setSelected] = React.useState(SELECTED_SLIDER.NONE);
  const [alphaPosition, setAlphaPosition] = React.useState({});
  const [huePosition, setHuePosition] = React.useState({});
  const [satLightPosition, setSatLightPosition] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const alphaRef = React.useRef(null);
  const hueRef = React.useRef(null);
  const satLightRef = React.useRef(null);

  React.useEffect(() => {
    setAlphaPosition({
      x: alphaRef.current.offsetWidth,
      y: SELECTOR_HEIGHT,
    });
    setHuePosition({
      x: Math.floor(Math.random() * hueRef.current.offsetWidth),
      y: SELECTOR_HEIGHT,
    });
    setSatLightPosition({
      x: satLightRef.current.offsetWidth,
      y: -SELECTOR_SIZE / 2,
    });
    setIsLoading(false);
  }, [setAlphaPosition, setHuePosition, setSatLightPosition]);

  const getHueColor = React.useCallback(() => {
    const hue = hueRef.current;
    if (hue) {
      const value = positionToValue(0, 360, huePosition.x, hue.offsetWidth);
      return convertHslToRgb(value);
    }
    return PLACEHOLDER_COLOR;
  }, [huePosition.x]);

  const getAlphaColor = React.useCallback(
    currentSatLightColor => {
      const alpha = alphaRef.current;
      if (alpha) {
        const width = alpha.offsetWidth;
        return [...currentSatLightColor.slice(0, 3), alphaPosition.x / width];
      }
      return PLACEHOLDER_COLOR;
    },
    [alphaPosition.x],
  );

  const getSatLightColor = React.useCallback(
    currentHueColor => {
      const satLight = satLightRef.current;
      if (satLight) {
        const blackAlpha = positionToValue(
          0,
          1,
          satLightPosition.y + SELECTOR_SIZE / 2,
          satLight.offsetHeight,
        );
        const whiteAlpha = positionToValue(
          0,
          1,
          satLight.offsetWidth - satLightPosition.x,
          satLight.offsetWidth,
        );
        return calculateSatLightColor(currentHueColor, blackAlpha, whiteAlpha);
      }
      return PLACEHOLDER_COLOR;
    },
    [satLightPosition.x, satLightPosition.y],
  );

  const hueColor = React.useMemo(() => getHueColor(), [getHueColor]);

  const satLightColor = React.useMemo(() => getSatLightColor(hueColor), [
    getSatLightColor,
    hueColor,
  ]);
  const alphaColor = React.useMemo(() => getAlphaColor(satLightColor), [
    getAlphaColor,
    satLightColor,
  ]);

  const setUp = React.useCallback(() => {
    setSelected(SELECTED_SLIDER.NONE);
  }, []);

  const changeSelected = React.useCallback(
    selectedElement => {
      setSelected(selectedElement);
    },
    [setSelected],
  );

  const changeAlphaPosition = React.useCallback(
    newOpacity => {
      setAlphaPosition(newOpacity);
    },
    [setAlphaPosition],
  );

  const changeHuePosition = React.useCallback(
    color => {
      setHuePosition(color);
    },
    [setHuePosition],
  );

  const changeSatLightPosition = React.useCallback(
    color => {
      setSatLightPosition(color);
    },
    [setSatLightPosition],
  );

  React.useEffect(() => {
    window.addEventListener('mouseup', setUp);
    window.addEventListener('touchend', setUp);
    return () => {
      window.removeEventListener('mouseup', setUp);
      window.removeEventListener('touchend', setUp);
    };
  }, [setUp]);

  return (
    <Wrapper style={{ opacity: isLoading ? 0 : 1 }}>
      <SaturationLightnessSlider
        changeSelected={changeSelected}
        selected={selected}
        satLightRef={satLightRef}
        hueColor={hueColor}
        satLightColor={satLightColor}
        changeSatLightPosition={changeSatLightPosition}
        satLightPosition={satLightPosition}
      />
      <BottomWrapper>
        <SelectedColor color={alphaColor} />
        <SlidersWrapper>
          <HueSlider
            changeSelected={changeSelected}
            selected={selected}
            hueRef={hueRef}
            hueColor={hueColor}
            huePosition={huePosition}
            changeHuePosition={changeHuePosition}
          />
          <AlphaSlider
            changeSelected={changeSelected}
            selected={selected}
            alphaRef={alphaRef}
            alphaColor={alphaColor}
            alphaPosition={alphaPosition}
            changeAlphaPosition={changeAlphaPosition}
            satLightColor={satLightColor}
          />
        </SlidersWrapper>
      </BottomWrapper>
      <ColorValues color={alphaColor} />
    </Wrapper>
  );
};

export default ColorPicker;
