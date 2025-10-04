import React from 'react';
import { observer } from 'mobx-react';

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
      <p>Modal Content</p>
      {tankStore.modal.activeTankId !== null && <p>Active tank: {tankStore.modal.activeTankId}</p>}
    </div>
  );
};

export default observer(ModalContent);
