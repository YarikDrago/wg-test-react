import React from 'react';

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

  function positionModal(card: HTMLDivElement) {
    const height = card.clientHeight;
    const top = card.offsetTop;
    const left = card.offsetLeft;
    tankStore.setModalLeft(left);
    tankStore.setModalTop(top + height);
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
