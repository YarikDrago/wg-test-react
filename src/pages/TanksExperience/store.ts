import { makeAutoObservable } from 'mobx';

import { TankData } from '@/pages/TanksExperience/tankData';

interface CardRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

interface Modal {
  activeTankId: number | null;
  top: number | null;
  left: number | null;
  cardRect: CardRect;
  height: number;
  width: number;
  actionInside: boolean;
  isBelow: boolean;
  arrowXPos: number;
  coefMode: number;
  daysValue: number;
  timeout: ReturnType<typeof setTimeout> | null;
}

class tankStore {
  tanks: TankData[] = [];
  /* ID of active/hovered tank card */
  activeTankId: number | null = null;
  modal: Modal = {
    /* Active ID of tank for modal content */
    activeTankId: null,
    cardRect: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      bottom: 0,
      right: 0,
    },
    // for modal positioning
    top: null,
    left: null,
    height: 0,
    width: 0,
    actionInside: false,
    /* Position of the arrow on the modal (percentage of the modal width [0; 100])*/
    arrowXPos: 50,
    /* Is modal below the card */
    isBelow: true,
    coefMode: 1, // Default play mode- "Стандартная"
    daysValue: 0,
    timeout: null,
  };
  constructor() {
    makeAutoObservable(this);
  }

  changeActiveTankId(newId: number | null) {
    this.activeTankId = newId;
    if (newId !== null) {
      if (this.modal.timeout) {
        clearTimeout(this.modal.timeout);
      }
      if (newId !== this.modal.activeTankId) {
        this.modal.activeTankId = newId;
        this.resetModalContent();
      }
    }
  }

  changeModalActionInside(newStatus: boolean) {
    this.modal.actionInside = newStatus;
    if (newStatus) {
      if (this.modal.timeout) {
        clearTimeout(this.modal.timeout);
      }
    } else {
      if (this.activeTankId === null) {
        this.resetModalPositionTimeout();
      }
    }
  }

  setModalTop(top: number | null) {
    this.modal.top = top;
    if (top !== null) {
      if (this.modal.timeout) {
        clearTimeout(this.modal.timeout);
      }
    }
  }

  setModalLeft(left: number | null) {
    this.modal.left = left;
    if (left !== null) {
      if (this.modal.timeout) {
        clearTimeout(this.modal.timeout);
      }
    }
  }

  changeModalIsBelow(newStatus: boolean) {
    this.modal.isBelow = newStatus;
  }

  setArrowXPos(newPos: number) {
    this.modal.arrowXPos = newPos;
  }

  changeCoefMode(newMode: number) {
    this.modal.coefMode = newMode;
  }

  setDaysValue(newDays: number | string) {
    if (isNaN(+newDays)) {
      this.modal.daysValue = 0;
    } else {
      if (+newDays < 0) {
        newDays = 0;
      }
      if (+newDays > 300) {
        newDays = 300;
      }
      this.modal.daysValue = +newDays;
    }
  }

  resetModalPosition() {
    this.modal.top = null;
    this.modal.left = null;
    this.modal.activeTankId = null;
    // additionally
    this.modal.actionInside = false;
    this.resetModalContent();
  }

  resetModalPositionTimeout() {
    this.modal.timeout = setTimeout(() => {
      this.resetModalPosition();
    }, 1000);
  }

  resetModalContent() {
    this.modal.daysValue = 0;
    this.modal.coefMode = 1;
  }
}

export default new tankStore();
