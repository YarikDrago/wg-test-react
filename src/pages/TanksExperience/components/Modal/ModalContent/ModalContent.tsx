import React from 'react';
import { observer } from 'mobx-react';

import LeftSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/LeftSide/LeftSide';
import RightSide from '@/pages/TanksExperience/components/Modal/ModalContent/components/RightSide/RightSide';
import tankStore from '@/pages/TanksExperience/store';

import * as styles from './ModalContent.module.scss';

const ModalContent = () => {
  function handleGetIn() {
    tankStore.changeModalActionInside(true);
  }

  function handleGetOut() {
    tankStore.changeModalActionInside(false);
  }

  return (
    <div
      className={styles.modalContent}
      onPointerEnter={() => handleGetIn()}
      onPointerLeave={() => handleGetOut()}
    >
      {/*{tankStore.modal.activeTankId !== null && <p>Active tank: {tankStore.modal.activeTankId}</p>}*/}
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default observer(ModalContent);
