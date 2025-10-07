import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import Modal from '@/pages/TanksExperience/components/Modal/Modal';
import ModalContent from '@/pages/TanksExperience/components/Modal/ModalContent/ModalContent';
import TankCard from '@/pages/TanksExperience/components/TankCard/TankCard';
import { pageDesc } from '@/pages/TanksExperience/pageDesc';
import { downloadTanksData } from '@/pages/TanksExperience/utils/downloadTanksData';

import tankStore from './store';
import * as styles from './TanksExperience.module.scss';

const TanksExperience = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  useEffect(() => {
    const determineModalMode = () => {
      // TODO reset modal
      setIsFullscreen(window.innerWidth < 900);
    };

    downloadTanksData();
    determineModalMode();

    window.addEventListener('resize', determineModalMode);
    return () => {
      window.removeEventListener('resize', determineModalMode);
    };
  }, []);

  useEffect(() => {
    if (!modalRef.current) return;
    const height = modalRef.current.clientHeight;
    const width = modalRef.current.clientWidth;
    tankStore.modal.height = height;
    tankStore.modal.width = width;
  }, [modalRef.current]);

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <p className={styles.desc}>{pageDesc}</p>
        <div className={styles.cardsContainer}>
          {tankStore.tanks.map((tank, index) => {
            return <TankCard key={index} id={index} name={tank.name} imgPath={tank.img} />;
          })}
        </div>
      </div>
      {tankStore.modal.activeTankId !== null && (
        <Modal
          ref={modalRef}
          top={tankStore.modal.top ? tankStore.modal.top : 0}
          left={tankStore.modal.left ? tankStore.modal.left : 0}
          isFullscreen={isFullscreen}
          handleClose={() => {
            tankStore.resetModalPosition();
          }}
        >
          <ModalContent isFullscreen={isFullscreen} />
        </Modal>
      )}
    </div>
  );
};

export default observer(TanksExperience);
