import { makeAutoObservable } from 'mobx';

import { TankData } from '@/pages/TanksExperience/tankData';

interface Modal {
  activeTankId: number | null;
  top: number | null;
  left: number | null;
  height: number;
  width: number;
  actionInside: boolean;
  isBelow: boolean;
  arrowXPos: number;
  timeout: ReturnType<typeof setTimeout> | null;
}

class tankStore {
  tanks: TankData[] = [];
  /* ID of active/hovered tank card */
  activeTankId: number | null = null;
  modal: Modal = {
    /* Active ID of tank for modal content */
    activeTankId: null,
    top: null,
    left: null,
    height: 0,
    width: 0,
    actionInside: false,
    /* Position of the arrow on the modal (percentage of the modal width [0; 100])*/
    arrowXPos: 50,
    /* Is modal below the card */
    isBelow: true,
    timeout: null,
  };
  constructor() {
    makeAutoObservable(this);
  }

  changeActiveTankId(newId: number | null) {
    this.activeTankId = newId;
    if (newId !== null) {
      // TODO if different tank is selected, reset modal content parameters
      this.modal.activeTankId = newId;
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
        this.resetModalPosition();
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

  resetModalPosition() {
    this.modal.top = null;
    this.modal.left = null;
    this.modal.activeTankId = null;
    // additionally
    this.modal.actionInside = false;
  }

  resetModalPositonTimeout() {
    this.modal.timeout = setTimeout(() => {
      this.resetModalPosition();
    }, 1000);
  }
}

export default new tankStore();
