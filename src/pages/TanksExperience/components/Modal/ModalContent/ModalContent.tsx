import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import LeftSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/LeftSide/LeftSide';
import RightSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/RightSide/RightSide';
import { clipForm } from '@/pages/TanksExperience/components/Modal/ModalContent/utils/clipForm';
import { positionModal } from '@/pages/TanksExperience/components/TankCard/utils/positionModal';
import tankStore from '@/pages/TanksExperience/store';

import * as styles from './ModalContent.module.scss';

interface ModalContentProps {
  isFullscreen?: boolean;
}

const ModalContent = ({ isFullscreen = false }: ModalContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const simBorder = useRef<HTMLDivElement>(null);

  function handleGetIn() {
    tankStore.changeModalActionInside(true);
  }

  function handleGetOut() {
    tankStore.changeModalActionInside(false);
  }

  const clickOut = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    /* Checking if the click is inside the elements with the specified classes */
    const isInsideModal = target.closest('.modalContent');
    const isTankCard = target.closest('.tankCard');

    if (isInsideModal || isTankCard) {
      console.log('include');
    } else {
      console.log('not include');
      tankStore.resetModalPositionTimeout();
    }
  };

  useEffect(() => {
    if (!contentRef.current || !simBorder.current) return;
    // TODO
    tankStore.modal.width = contentRef.current.clientWidth;
    tankStore.modal.height = contentRef.current.clientHeight;
    window.addEventListener('click', clickOut);

    return () => {
      tankStore.modal.width = 0;
      tankStore.modal.height = 0;
      window.removeEventListener('click', clickOut);
    };
  }, []);

  useEffect(() => {
    /* Do not calculate position and clip path
    for fullscreen modal */
    if (isFullscreen) return;
    if (!contentRef.current || !simBorder.current) return;
    positionModal();
    clipForm(
      isFullscreen,
      tankStore.modal.isBelow,
      tankStore.modal.arrowXPos,
      simBorder.current,
      contentRef.current
    );
  }, [
    tankStore.modal.isBelow,
    tankStore.modal.arrowXPos,
    isFullscreen,
    tankStore.modal.activeTankId,
  ]);

  return (
    <div
      ref={contentRef}
      className={`${styles.modalContent} modalContent`}
      onPointerEnter={() => handleGetIn()}
      onPointerLeave={() => handleGetOut()}
      style={{
        paddingTop: tankStore.modal.isBelow ? (isFullscreen ? '' : '76px') : '',
        paddingBottom: tankStore.modal.isBelow ? '' : isFullscreen ? '' : '76px',
      }}
    >
      <LeftSide />
      <RightSide />
      <div
        ref={simBorder}
        className={styles.borderSim}
        style={{ display: isFullscreen ? 'none' : 'block' }}
      />
    </div>
  );
};

export default observer(ModalContent);
