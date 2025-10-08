import React from 'react';

import LinkedInLogo from '@/assets/icons/linkedin.svg';
import IULogo from '@/assets/images/logo-IU.svg';

import * as styles from './Footer.module.scss';

const LINKEDIN_LINK = 'https://www.linkedin.com/in/i-uliantsev/';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <IULogo width={50} height={50} />
      <div className={styles.line}>
        <p>2025, Iaroslav Uliantsev</p>
        <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
          <LinkedInLogo />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
