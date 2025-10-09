import React from 'react';

import * as styles from './Slider.module.scss';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange?: (value: number) => void;
}

const Slider = ({ min, max, step, value, onChange }: SliderProps) => {
  const getSliderPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(+e.target.value);
      }}
      className={styles.slider}
      style={{ '--val': `${getSliderPercentage()}%` } as React.CSSProperties}
    />
  );
};

export default Slider;
