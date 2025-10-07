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
    const cardRect = target.getBoundingClientRect();
    tankStore.modal.cardRect.top = cardRect.top;
    tankStore.modal.cardRect.left = cardRect.left;
    tankStore.modal.cardRect.width = cardRect.width;
    tankStore.modal.cardRect.height = cardRect.height;
    tankStore.modal.cardRect.bottom = cardRect.bottom;
    tankStore.modal.cardRect.right = cardRect.right;
    // TODO replace with function from store
    tankStore.activeTankId = id;
    tankStore.changeActiveTankId(id);
  }

  function handleGetOut() {
    tankStore.changeActiveTankId(null);
    tankStore.resetModalPositionTimeout();
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
