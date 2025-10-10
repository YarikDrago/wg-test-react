import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import starImage from '@/assets/images/Star 1.png';
import tankStore from '@/pages/TanksExperience/store';
import AnimatedNumber from '@/shared/components/AnimatedNumbers/AnimatedNumber';

import * as styles from './RightSide.module.scss';

const RightSide = () => {
  const [skillPoints, setSkillPoints] = useState(0);

  /* Determine skill points based on tank coef and days value */
  useEffect(() => {
    let tankCoef = 0;
    if (tankStore.modal.activeTankId !== null) {
      tankCoef = tankStore.tanks[tankStore.modal.activeTankId].coef;
    }
    const targetValue = Math.round(tankStore.modal.daysValue * tankCoef * tankStore.modal.coefMode);
    setSkillPoints(targetValue);
  }, [tankStore.modal.daysValue, tankStore.modal.activeTankId, tankStore.modal.coefMode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue.length > 1) {
      newValue = newValue.replace(/^0+/, '');
    }
    if (/^\d*$/.test(newValue)) {
      tankStore.setDaysValue(newValue);
    }
  };

  return (
    <div className={styles.rightSide}>
      <div className={styles.expBlock}>
        <h4>Опыт танка</h4>
        <div className={styles.resultLine}>
          <img src={starImage} alt="star" className={styles.star} />
          <AnimatedNumber value={skillPoints} />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <input
          type="number"
          min={0}
          max={300}
          step={1}
          placeholder="0"
          value={tankStore.modal.daysValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default observer(RightSide);
