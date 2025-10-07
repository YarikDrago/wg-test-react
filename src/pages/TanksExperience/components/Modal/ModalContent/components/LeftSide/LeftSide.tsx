import React from 'react';
import { observer } from 'mobx-react';

import tankStore from '@/pages/TanksExperience/store';

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
                <input
                  type="radio"
                  key={index}
                  name={'play-mode'}
                  value={opt.value}
                  checked={tankStore.modal.coefMode === opt.value}
                  onChange={(e) => {
                    if (isNaN(+e.target.value)) return;
                    tankStore.changeCoefMode(+e.target.value);
                  }}
                />
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
            <input
              type="range"
              min={0}
              max={300}
              step={1}
              value={tankStore.modal.daysValue}
              onChange={(e) => {
                tankStore.setDaysValue(e.target.value);
              }}
              className={styles.slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LeftSide);
