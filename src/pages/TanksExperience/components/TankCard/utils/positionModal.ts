import tankStore from '@/pages/TanksExperience/store';

export function positionModal() {
  /* Additional margin to the edge of the screen */
  const MARGIN = 8;
  /* GAp between the card and the modal */
  const CARD_GAP = 10;
  const cardRect = tankStore.modal.cardRect;

  /* Determine top position of modal */
  let top = 0;

  const canPlaceBelow =
    cardRect.bottom + CARD_GAP + tankStore.modal.height + MARGIN < window.innerHeight;

  if (canPlaceBelow) {
    top = cardRect.bottom + CARD_GAP + window.scrollY;
    tankStore.changeModalIsBelow(true);
  } else {
    const canPlaceAbove = cardRect.top - (CARD_GAP + tankStore.modal.height + MARGIN) > 0;
    if (canPlaceAbove) {
      top = cardRect.top + window.scrollY - CARD_GAP - tankStore.modal.height;
    } else {
      /* This condition is when the modal can't be placed fully below
    and can't be placed fully above.
    * Place the modal on the top of the screen. */
      top = window.scrollY + MARGIN;
    }
    tankStore.changeModalIsBelow(false);
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

  /* Determine the position of the arrow */
  const cardXCenter = cardRect.left + cardRect.width / 2;
  const cardXCenterPercent = ((cardXCenter - left) / tankStore.modal.width) * 100;

  tankStore.setModalLeft(left);
  tankStore.setModalTop(top);
  tankStore.setArrowXPos(cardXCenterPercent);
}
