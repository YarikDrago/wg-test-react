import React from 'react';

import { positionModal } from '@/pages/TanksExperience/components/TankCard/utils/positionModal';

import tankStore from '../../store';
import * as styles from './TankCard.module.scss';

interface TankCardProps {
  id: number;
  name: string;
  imgPath: string;
}

const TankCard = ({ id, name, imgPath }: TankCardProps) => {
  const imagePath = require(`@/assets/images/tanks/${imgPath}`);

  function handleGetIn(e: React.PointerEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    positionModal(target);
    tankStore.activeTankId = id;
    tankStore.changeActiveTankId(id);
  }

  function handleGetOut() {
    tankStore.changeActiveTankId(null);
    tankStore.resetModalPositonTimeout();
  }

  return (
    <div
      className={styles.tankCard}
      onPointerEnter={(e) => {
        handleGetIn(e);
      }}
      onPointerLeave={() => handleGetOut()}
    >
      <img src={imagePath} alt={`tank ${name}`} />
      <p>{name}</p>
    </div>
  );
};

export default TankCard;
