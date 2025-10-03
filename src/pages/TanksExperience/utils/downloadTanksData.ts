import tankStore from '@/pages/TanksExperience/store';
import { tanksData } from '@/pages/TanksExperience/tankData';

export function downloadTanksData() {
  tankStore.tanks = tanksData;
}
