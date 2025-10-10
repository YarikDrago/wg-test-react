import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import starImage from '@/assets/images/Star 1.png';
import tankStore from '@/pages/TanksExperience/store';

import * as styles from './RightSide.module.scss';

const RightSide = () => {
  const [skillPoints, setSkillPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentValue = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    let tankCoef = 0;
    if (tankStore.modal.activeTankId !== null) {
      tankCoef = tankStore.tanks[tankStore.modal.activeTankId].coef;
    }
    const targetValue = Math.round(tankStore.modal.daysValue * tankCoef * tankStore.modal.coefMode);

    animateValue(currentValue.current, targetValue);
  }, [tankStore.modal.daysValue, tankStore.modal.activeTankId, tankStore.modal.coefMode]);

  const animateValue = (start: number, end: number, duration: number = 500) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    const startTime = performance.now();
    const diff = end - start;

    setIsAnimating(true);

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      /* Progress of the animation (0-1)
       Limit progress to 1 to avoid overflow.
      * */
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      /* Animation display value.
       Always show positive value.*/
      const current = Math.abs(Math.round(start + diff * easeOut));

      setSkillPoints(current);

      /* If animation is not finished, request next frame */
      if (progress !== 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        currentValue.current = end;
      }
    }

    animationFrame.current = requestAnimationFrame(animate);
  };

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
          <p className={`${styles.result} ${isAnimating ? styles.updating : ''}`}>{skillPoints}</p>
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
