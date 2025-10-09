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
    tankStore.modal.cardRect.top = cardRect.top;
    tankStore.modal.cardRect.left = cardRect.left;
    tankStore.modal.cardRect.width = cardRect.width;
    tankStore.modal.cardRect.height = cardRect.height;
    tankStore.modal.cardRect.bottom = cardRect.bottom;
    tankStore.modal.cardRect.right = cardRect.right;
    tankStore.activeTankId = id;
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
