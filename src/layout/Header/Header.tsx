import React, { useState } from 'react';

import BurgerIcon from '@/assets/icons/list-nested.svg';
import LogoWG from '@/assets/images/wg_logo.svg';
import ModalNavigation from '@/layout/Header/Navigation/Navigation/ModalNavigation';
import Navigation from '@/layout/Header/Navigation/Navigation/Navigation';

import * as styles from './Header.module.scss';

const Header = () => {
  const [modalNavIsOpened, setModalNavIsOpened] = useState(false);

  const handleOpenModal = () => {
    setModalNavIsOpened(true);
  };

  return (
    <header className={styles.header}>
      <a href={'https://wargaming.net/en'} className={styles.logo}>
        <LogoWG />
      </a>
      <Navigation />
      {/* Burger menu button */}
      <button className={styles.menuButton} onClick={() => handleOpenModal()}>
        <BurgerIcon />
      </button>
      <ModalNavigation
        isOpened={modalNavIsOpened}
        handleClose={() => {
          setModalNavIsOpened(false);
        }}
      />
    </header>
  );
};

export default Header;
