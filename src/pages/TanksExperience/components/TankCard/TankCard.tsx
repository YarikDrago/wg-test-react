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
    // TODO if (isFullscreen) return
    /* Additional margin to the edge of the screen */
    const MARGIN = 8;
    const cardRect = card.getBoundingClientRect();

    /* Determine top position of modal */
    let top = 0;

    const canPlaceBelow = cardRect.bottom + tankStore.modal.height + MARGIN < window.innerHeight;

    if (canPlaceBelow) {
      top = cardRect.bottom + window.scrollY;
      // TODO isPlaceBelow = true;
    } else {
      const canPlaceAbove = cardRect.top - tankStore.modal.height - MARGIN > 0;
      if (canPlaceAbove) {
        top = cardRect.top + window.scrollY - tankStore.modal.height;
      } else {
        /* This condition is when the modal can't be placed fully below
      and can't be placed fully above.
      * Place the modal on the top of the screen. */
        top = window.scrollY + MARGIN;
      }
      // TODO isPlaceBelow = false;
    }

    /* Determine the left position of the modal */
    let left = 0;
    /* 15px for Y-scroll */
    const canPlaceLeft = cardRect.left + tankStore.modal.width + MARGIN + 15 < window.innerWidth;
    if (canPlaceLeft) {
      left = cardRect.left;
    } else {
      left = cardRect.right - tankStore.modal.width;
    }

    tankStore.setModalLeft(left);
    tankStore.setModalTop(top);
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
