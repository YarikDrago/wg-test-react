import React, { useEffect, useRef } from 'react';

import chevronIcon from '@/assets/icons/chevron.png';

import * as styles from './ScrollOnTopBtn.module.scss';

const ScrollOnTopBtn = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  let lastScrollY = window.scrollY;
  useEffect(() => {
    const scrollReact = () => {
      if (!btnRef.current) return;
      const currentScroll = window.scrollY;
      const halfScreen = window.innerHeight / 2;

      const scrollingUp = currentScroll < lastScrollY;
      const farFromTop = currentScroll > halfScreen;

      if (scrollingUp && farFromTop) {
        btnRef.current.setAttribute('show', '');
      } else {
        btnRef.current.removeAttribute('show');
      }

      lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', scrollReact);

    return () => {
      window.removeEventListener('scroll', scrollReact);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button ref={btnRef} className={styles.button} onClick={handleClick}>
      <img src={chevronIcon} alt="scroll to top" />
    </button>
  );
};

export default ScrollOnTopBtn;
