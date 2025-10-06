import React from 'react';

import * as styles from './LeftSide.module.scss';

export const tankOptions = [
  { value: 1, label: 'Стандартная' },
  { value: 1.1, label: 'Элитная' },
  { value: 1.2, label: 'Премиум' },
];

const LeftSide = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.playModeBlock}>
        <h4>Комплектация</h4>
        <div className={styles.playModeSelector}>
          {tankOptions.map((opt, index) => {
            return (
              <label key={index} className={styles.radioLabel}>
                <input type="radio" key={index} name={'play-mode'} value={opt.value} />
                <span className={styles.custom} />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>
      <div className={styles.sliderBlock}>
        <h4>Количество боёв</h4>
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderBackground}>
            <input type="range" min={0} max={300} step={1} value={0} className={styles.slider} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
