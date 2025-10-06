import React from 'react';

import starImage from '@/assets/images/Star 1.png';

import * as styles from './RightSide.module.scss';

const RightSide = () => {
  return (
    <div className={styles.rightSide}>
      <div className={styles.expBlock}>
        <h4>Опыт танка</h4>
        <div className={styles.resultLine}>
          <img src={starImage} alt="star" className={styles.star} />
          <p className={styles.result}>000</p>
        </div>
      </div>
      <div className={styles.inputBlock}>
        <input type="number" min={0} max={300} step={1} value={0} />
      </div>
    </div>
  );
};

export default RightSide;
