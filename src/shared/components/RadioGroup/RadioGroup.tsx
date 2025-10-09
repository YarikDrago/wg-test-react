import React from 'react';

import * as styles from './RadioGroup.module.scss';

interface Option {
  label: string;
  value: number | string;
}

interface RadioGroupProps {
  optionsData: Option[];
  name?: string;
  onChange?: (value: string) => void;
  /* active option value */
  active?: string;
}

const RadioGroup = ({ optionsData, name, onChange, active = '' }: RadioGroupProps) => {
  return (
    <>
      {optionsData.map((opt, index) => {
        return (
          <label key={index} className={styles.radioLabel}>
            <input
              type="radio"
              key={index}
              name={name}
              value={opt.value}
              checked={opt.value == active}
              onChange={(e) => {
                if (onChange) onChange(e.target.value);
              }}
            />
            <span className={styles.custom} />
            {opt.label}
          </label>
        );
      })}
    </>
  );
};

export default RadioGroup;
