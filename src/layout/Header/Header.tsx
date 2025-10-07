import React from 'react';

import LogoWG from '@/assets/images/wg_logo.svg';
import Navigation from '@/layout/Header/Navigation/Navigation/Navigation';

import * as styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href={'https://wargaming.net/en'} className={styles.logo}>
        <LogoWG />
      </a>
      <Navigation />
    </header>
  );
};

export default Header;
