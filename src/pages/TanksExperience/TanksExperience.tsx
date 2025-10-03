import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import TankCard from '@/pages/TanksExperience/components/TankCard/TankCard';
import { downloadTanksData } from '@/pages/TanksExperience/utils/downloadTanksData';

import tankStore from './store';
import * as styles from './TanksExperience.module.scss';

const TanksExperience = () => {
  useEffect(() => {
    downloadTanksData();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.cardsContainer}>
          {tankStore.tanks.map((tank, index) => {
            return <TankCard key={index} name={tank.name} imgPath={tank.img} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default observer(TanksExperience);
