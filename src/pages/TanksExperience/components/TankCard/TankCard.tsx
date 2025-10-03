import React from 'react';

import * as styles from './TankCard.module.scss';

interface TankCardProps {
  name: string;
  imgPath: string;
}

const TankCard = ({ name, imgPath }: TankCardProps) => {
  const imagePath = require(`@/assets/images/tanks/${imgPath}`);

  return (
    <div className={styles.tankCard}>
      <img src={imagePath} alt={`tank ${name}`} />
      <p>{name}</p>
    </div>
  );
};

export default TankCard;
