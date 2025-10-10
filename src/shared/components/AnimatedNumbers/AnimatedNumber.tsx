import React, { useEffect, useRef, useState } from 'react';

import * as styles from './AnimatedNumber.module.scss';

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentValue = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    animateValue(currentValue.current, value);
  }, [value]);

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

      setDisplayValue(current);

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

  return <p className={`${styles.result} ${isAnimating ? styles.updating : ''}`}>{displayValue}</p>;
};

export default AnimatedNumber;
