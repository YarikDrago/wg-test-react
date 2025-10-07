import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import LeftSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/LeftSide/LeftSide';
import RightSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/RightSide/RightSide';
import { clipForm } from '@/pages/TanksExperience/components/Modal/ModalContent/utils/clipForm';
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

  useEffect(() => {
    // TODO isFullscreen
    if (!contentRef.current || !simBorder.current) return;
    clipForm(
      isFullscreen,
      tankStore.modal.isBelow,
      tankStore.modal.arrowXPos,
      simBorder.current,
      contentRef.current
    );
  }, [tankStore.modal.isBelow, tankStore.modal.arrowXPos, isFullscreen]);

  useEffect(() => {
    console.log(isFullscreen);
  }, [isFullscreen]);

  return (
    <div
      ref={contentRef}
      className={styles.modalContent}
      onPointerEnter={() => handleGetIn()}
      onPointerLeave={() => handleGetOut()}
      style={{
        paddingTop: tankStore.modal.isBelow ? (isFullscreen ? '' : '76px') : '',
        paddingBottom: tankStore.modal.isBelow ? '' : isFullscreen ? '' : '76px',
      }}
    >
      {/*{tankStore.modal.activeTankId !== null && <p>Active tank: {tankStore.modal.activeTankId}</p>}*/}
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
