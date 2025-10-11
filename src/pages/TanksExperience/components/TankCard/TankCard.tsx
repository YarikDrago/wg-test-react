import React from 'react';

import { usePointerType } from '@/shared/hooks/usePointerType';

import tankStore from '../../store';
import * as styles from './TankCard.module.scss';

interface TankCardProps {
  id: number;
  name: string;
  imgPath: string;
}

const TankCard = ({ id, name, imgPath }: TankCardProps) => {
  const imagePath = require(`@/assets/images/tanks/${imgPath}`);
  const { hasPointer } = usePointerType();

  function handleGetOut() {
    tankStore.changeActiveTankId(null);
    tankStore.resetModalPositionTimeout();
  }

  function saveAsActiveCard(
    e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) {
    const target = e.currentTarget as HTMLDivElement;
    const cardRect = target.getBoundingClientRect();
    const storeCardRect = {
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      bottom: cardRect.bottom,
      right: cardRect.right,
    };
    tankStore.modal.cardRect = storeCardRect;
    tankStore.changeActiveTankId(id);
  }

  return (
    <div
      className={`${styles.tankCard} tankCard`}
      {...(hasPointer && {
        onPointerEnter: (e) => saveAsActiveCard(e),
        onPointerLeave: () => handleGetOut(),
      })}
      {...(!hasPointer && {
        onClick: (e) => saveAsActiveCard(e),
      })}
    >
      <img src={imagePath} alt={`tank ${name}`} />
      <p>{name}</p>
    </div>
  );
};

export default TankCard;
