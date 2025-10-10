import React from 'react';
import { observer } from 'mobx-react';

import tankStore from '@/pages/TanksExperience/store';
import { playMode } from '@/pages/TanksExperience/tankData';
import RadioGroup from '@/shared/components/RadioGroup/RadioGroup';
import Slider from '@/shared/components/Slider/Slider';

import * as styles from './LeftSide.module.scss';

const LeftSide = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.playModeBlock}>
        <h4>Комплектация</h4>
        <div className={styles.playModeSelector}>
          <RadioGroup
            optionsData={playMode}
            name={'play-mode'}
            onChange={(newValue) => {
              if (isNaN(+newValue)) return;
              tankStore.changeCoefMode(+newValue);
            }}
            active={tankStore.modal.coefMode.toString()}
          />
        </div>
      </div>
      <div className={styles.sliderBlock}>
        <h4>Количество боёв</h4>
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderBackground}>
            <Slider
              min={0}
              max={300}
              step={1}
              value={tankStore.modal.daysValue}
              onChange={(value) => {
                tankStore.setDaysValue(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LeftSide);
