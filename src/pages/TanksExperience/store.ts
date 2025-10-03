import { makeAutoObservable } from 'mobx';

import { TankData } from '@/pages/TanksExperience/tankData';

class tankStore {
  tanks: TankData[] = [];
  constructor() {
    makeAutoObservable(this);
  }
}

export default new tankStore();
